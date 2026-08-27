import networkx as nx
from typing import List, Dict, Tuple, Set
from ..models.graph_models import (
    GraphData,
    GraphNode,
    GraphEdge,
    NodeType,
    ImpactStatus,
    SimulationRequest,
    SimulationResult,
    ReskillPathway,
    ReskillStep,
)
from ..data.industry_datasets import get_industry_graph


class GraphEngineService:
    @staticmethod
    def build_networkx_graph(graph_data: GraphData) -> nx.DiGraph:
        G = nx.DiGraph()
        for node in graph_data.nodes:
            G.add_node(node.id, **node.model_dump())
        for edge in graph_data.edges:
            G.add_edge(edge.source, edge.target, id=edge.id, relation=edge.relation, weight=edge.weight)
        return G

    @staticmethod
    def run_simulation(request: SimulationRequest) -> SimulationResult:
        base_graph = get_industry_graph(request.industry_id)
        adoption = max(0.0, min(1.0, request.ai_adoption_rate))
        
        # Clone nodes and edges for simulation state
        sim_nodes: List[GraphNode] = []
        node_map: Dict[str, GraphNode] = {}
        
        # Map connections
        process_automation_map: Dict[str, float] = {}
        
        # Step 1: Calculate Process Automation Impact
        for node in base_graph.nodes:
            node_copy = node.model_copy(deep=True)
            if node_copy.type == NodeType.PROCESS:
                # Effective automation is baseline potential * user adoption slider
                eff_auto = node_copy.automation_potential * adoption
                process_automation_map[node_copy.id] = eff_auto
                
                if eff_auto >= 0.60:
                    node_copy.status = ImpactStatus.AUTOMATED
                elif eff_auto >= 0.25:
                    node_copy.status = ImpactStatus.AUGMENTED
                else:
                    node_copy.status = ImpactStatus.BASELINE
            
            sim_nodes.append(node_copy)
            node_map[node_copy.id] = node_copy

        # Step 2: Propagate to Roles via (Role)-[:EXECUTES]->(Process)
        total_baseline_hc = 0
        total_baseline_cost = base_graph.baseline_annual_cost
        displaced_hc = 0
        augmented_hc = 0
        impacted_roles = 0
        
        for edge in base_graph.edges:
            if edge.relation == "EXECUTES" and edge.source in node_map and edge.target in process_automation_map:
                role = node_map[edge.source]
                proc_auto = process_automation_map[edge.target]
                
                if role.headcount:
                    total_baseline_hc += role.headcount
                    if proc_auto >= 0.55:
                        role.status = ImpactStatus.AT_RISK
                        impacted_roles += 1
                        role_displaced = int(role.headcount * proc_auto * 0.45)
                        role_augmented = int(role.headcount * (1 - proc_auto * 0.45))
                        displaced_hc += role_displaced
                        augmented_hc += role_augmented
                    elif proc_auto >= 0.25:
                        role.status = ImpactStatus.AUGMENTED
                        impacted_roles += 1
                        augmented_hc += role.headcount
                    else:
                        role.status = ImpactStatus.BASELINE

        # Step 3: Spawn New AI Co-Pilot / Transformation Roles
        new_copilot_roles = max(1, int(displaced_hc * 0.28)) if displaced_hc > 0 else 0
        for node in sim_nodes:
            if node.status == ImpactStatus.NEW_OPPORTUNITY:
                node.headcount = new_copilot_roles

        # Step 4: Calculate Enterprise Financial & Capacity Metrics
        avg_annual_salary = total_baseline_cost / max(1, total_baseline_hc) if total_baseline_hc > 0 else 70000.0
        projected_cost_savings = displaced_hc * avg_annual_salary * 0.85 + (augmented_hc * avg_annual_salary * 0.18)
        annual_hours_saved = (displaced_hc * 2080 * 0.80) + (augmented_hc * 2080 * 0.25)
        automation_index = round((sum(process_automation_map.values()) / max(1, len(process_automation_map))) * 100, 1)
        
        # Human in the Loop Safety Score (Maintains >72% even at 100% adoption)
        hitl_safety_score = round(max(72.0, 100.0 - (adoption * 24.5)), 1)

        # Step 5: Executive Insights Synthesis
        insights = [
            f"At {int(adoption * 100)}% AI adoption, the organization captures approximately ${projected_cost_savings:,.0f} in annual net operational value.",
            f"{augmented_hc} knowledge workers are successfully augmented with AI agents, elevating capacity without workforce reduction.",
            f"{displaced_hc} routine task roles flagged for high-velocity reskilling into {new_copilot_roles} newly created AI Strategist positions.",
            f"Enterprise Human-in-the-Loop (HITL) safety score remains calibrated at {hitl_safety_score}% for audit-ready compliance.",
        ]

        # Edge state update (highlight active transformation edges)
        sim_edges: List[GraphEdge] = []
        for edge in base_graph.edges:
            edge_copy = edge.model_copy(deep=True)
            if edge_copy.relation in ["AUTOMATES", "AUGMENTED_BY", "TRANSITIONS_TO"]:
                edge_copy.is_impacted = adoption > 0.2
            sim_edges.append(edge_copy)

        updated_graph = GraphData(
            industry_id=base_graph.industry_id,
            industry_name=base_graph.industry_name,
            nodes=sim_nodes,
            edges=sim_edges,
            total_headcount=total_baseline_hc,
            baseline_annual_cost=total_baseline_cost,
        )

        return SimulationResult(
            graph=updated_graph,
            automation_index=automation_index,
            projected_cost_savings=round(projected_cost_savings, 2),
            time_saved_hours_annual=round(annual_hours_saved, 1),
            impacted_roles_count=impacted_roles,
            displaced_headcount=displaced_hc,
            augmented_headcount=augmented_hc,
            new_ai_copilot_roles=new_copilot_roles,
            human_in_loop_safety_score=hitl_safety_score,
            summary_insights=insights,
        )

    @staticmethod
    def calculate_reskilling_pathway(industry_id: str, source_role_id: str, target_role_id: str) -> ReskillPathway:
        graph_data = get_industry_graph(industry_id)
        node_map = {n.id: n for n in graph_data.nodes}
        
        source_role = node_map.get(source_role_id)
        target_role = node_map.get(target_role_id)

        if not source_role or not target_role:
            # Fallback if invalid ID
            roles = [n for n in graph_data.nodes if n.type == NodeType.ROLE]
            source_role = roles[0] if roles else graph_data.nodes[0]
            target_role = roles[-1] if len(roles) > 1 else graph_data.nodes[-1]

        # Find connected skills
        G = GraphEngineService.build_networkx_graph(graph_data)
        
        source_skills: Set[str] = set()
        target_skills: Set[str] = set()

        for u, v, data in G.edges(data=True):
            if data.get("relation") == "REQUIRES_SKILL":
                if u == source_role.id:
                    source_skills.add(v)
                if u == target_role.id:
                    target_skills.add(v)

        # Fallback skill discovery if direct edge not found
        all_skills = [n for n in graph_data.nodes if n.type == NodeType.SKILL]
        if not target_skills and all_skills:
            target_skills = {s.id for s in all_skills[-2:]}
        if not source_skills and all_skills:
            source_skills = {s.id for s in all_skills[:2]}

        shared_skill_ids = source_skills.intersection(target_skills)
        delta_skill_ids = target_skills.difference(source_skills)
        if not delta_skill_ids and all_skills:
            delta_skill_ids = {s.id for s in all_skills if s.id not in source_skills}

        shared_names = [node_map[s].label for s in shared_skill_ids if s in node_map]
        delta_names = [node_map[s].label for s in delta_skill_ids if s in node_map]

        # If empty, add standard high-value enterprise skills
        if not delta_names:
            delta_names = ["Prompt Engineering & Structured Extraction", "Human-in-the-Loop Governance Auditing"]

        # Build progressive curriculum steps
        steps: List[ReskillStep] = []
        total_weeks = 0
        
        for idx, skill_name in enumerate(delta_names, 1):
            difficulty = "Moderate" if idx == 1 else "Advanced"
            weeks = 3 if difficulty == "Moderate" else 5
            total_weeks += weeks
            steps.append(
                ReskillStep(
                    step_number=idx,
                    skill_id=f"step_{idx}",
                    skill_name=skill_name,
                    category="AI & Technical Competency",
                    difficulty=difficulty,
                    estimated_weeks=weeks,
                    learning_focus=f"Hands-on lab modules, exception handling, and enterprise certification for {skill_name}.",
                )
            )

        # Feasibility scoring
        overlap_ratio = len(shared_names) / max(1, (len(shared_names) + len(delta_names)))
        feasibility_score = round(min(96.0, max(68.0, (overlap_ratio * 40.0) + 60.0)), 1)
        reskilling_cost = round(total_weeks * 950.0, 2)  # $950/week training budget

        salary_diff = (target_role.avg_salary or 110000.0) - (source_role.avg_salary or 55000.0)
        salary_pct = round((salary_diff / max(1, source_role.avg_salary or 55000.0)) * 100)
        growth_multiplier = f"+{salary_pct}% Salary Upside & 5-Year Career Longevity"

        rationale = (
            f"Transitioning from '{source_role.label}' to '{target_role.label}' leverages existing domain foundational knowledge "
            f"while closing {len(delta_names)} high-leverage AI capability gaps over {total_weeks} weeks at a fraction of external hiring costs."
        )

        return ReskillPathway(
            source_role=source_role,
            target_role=target_role,
            shared_skills=shared_names,
            delta_skills_to_acquire=delta_names,
            transition_feasibility_score=feasibility_score,
            total_estimated_weeks=total_weeks,
            estimated_reskilling_cost=reskilling_cost,
            steps=steps,
            career_growth_multiplier=growth_multiplier,
            rationale=rationale,
        )
