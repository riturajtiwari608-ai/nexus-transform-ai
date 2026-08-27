from enum import Enum
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class NodeType(str, Enum):
    PROCESS = "process"
    ROLE = "role"
    SKILL = "skill"
    AI_AGENT = "ai_agent"


class ImpactStatus(str, Enum):
    BASELINE = "baseline"
    AUGMENTED = "augmented"
    AUTOMATED = "automated"
    AT_RISK = "at_risk"
    NEW_OPPORTUNITY = "new_opportunity"


class GraphNode(BaseModel):
    id: str
    label: str
    type: NodeType
    department: str = "General"
    description: str = ""
    status: ImpactStatus = ImpactStatus.BASELINE
    automation_potential: float = 0.0  # 0.0 to 1.0 (0% to 100%)
    headcount: Optional[int] = None
    avg_salary: Optional[float] = None
    complexity: Optional[str] = "Medium"
    source_citation: Optional[str] = None
    position: Optional[Dict[str, float]] = None  # {"x": 100, "y": 200}
    properties: Dict[str, Any] = Field(default_factory=dict)


class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    relation: str  # EXECUTES, REQUIRES_SKILL, AUGMENTED_BY, AUTOMATES, TRANSITIONS_TO, PREREQUISITE_OF
    weight: float = 1.0
    is_impacted: bool = False
    label: Optional[str] = None


class GraphData(BaseModel):
    industry_id: str
    industry_name: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    total_headcount: int = 0
    baseline_annual_cost: float = 0.0


class SimulationRequest(BaseModel):
    industry_id: str
    ai_adoption_rate: float = 0.5  # 0.0 to 1.0 (0% to 100%)
    target_departments: List[str] = Field(default_factory=list)
    selected_agents: List[str] = Field(default_factory=list)


class SimulationResult(BaseModel):
    graph: GraphData
    automation_index: float
    projected_cost_savings: float
    time_saved_hours_annual: float
    impacted_roles_count: int
    displaced_headcount: int
    augmented_headcount: int
    new_ai_copilot_roles: int
    human_in_loop_safety_score: float
    summary_insights: List[str]


class ReskillStep(BaseModel):
    step_number: int
    skill_id: str
    skill_name: str
    category: str
    difficulty: str
    estimated_weeks: int
    learning_focus: str


class ReskillRequest(BaseModel):
    industry_id: str
    source_role_id: str
    target_role_id: str


class ReskillPathway(BaseModel):
    source_role: GraphNode
    target_role: GraphNode
    shared_skills: List[str]
    delta_skills_to_acquire: List[str]
    transition_feasibility_score: float
    total_estimated_weeks: int
    estimated_reskilling_cost: float
    steps: List[ReskillStep]
    career_growth_multiplier: str
    rationale: str


class IngestRequest(BaseModel):
    document_name: str
    document_type: str = "SOP"  # SOP, Job_Description, Process_Manual
    content: str
    target_department: str = "Operations"


class IngestResult(BaseModel):
    status: str
    extracted_nodes: List[GraphNode]
    extracted_edges: List[GraphEdge]
    confidence_score: float
    summary: str


class IndustryMeta(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    node_count: int
    edge_count: int
    baseline_headcount: int
    baseline_cost: float
