export type NodeType = 'process' | 'role' | 'skill' | 'ai_agent';
export type ImpactStatus = 'baseline' | 'augmented' | 'automated' | 'at_risk' | 'new_opportunity';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  department: string;
  description: string;
  status: ImpactStatus;
  automation_potential: number;
  headcount?: number;
  avg_salary?: number;
  complexity?: string;
  source_citation?: string;
  position?: { x: number; y: number };
  properties?: Record<string, any>;
  [key: string]: any;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
  weight: number;
  is_impacted?: boolean;
  label?: string;
}

export interface GraphData {
  industry_id: string;
  industry_name: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_headcount: number;
  baseline_annual_cost: number;
}

export interface IndustryMeta {
  id: string;
  name: string;
  description: string;
  icon: string;
  node_count: number;
  edge_count: number;
  baseline_headcount: number;
  baseline_cost: number;
}

export interface SimulationResult {
  graph: GraphData;
  automation_index: number;
  projected_cost_savings: number;
  time_saved_hours_annual: number;
  impacted_roles_count: number;
  displaced_headcount: number;
  augmented_headcount: number;
  new_ai_copilot_roles: number;
  human_in_loop_safety_score: number;
  summary_insights: string[];
}

export interface ReskillStep {
  step_number: number;
  skill_id: string;
  skill_name: string;
  category: string;
  difficulty: string;
  estimated_weeks: number;
  learning_focus: string;
}

export interface ReskillPathway {
  source_role: GraphNode;
  target_role: GraphNode;
  shared_skills: string[];
  delta_skills_to_acquire: string[];
  transition_feasibility_score: number;
  total_estimated_weeks: number;
  estimated_reskilling_cost: number;
  steps: ReskillStep[];
  career_growth_multiplier: string;
  rationale: string;
}

export interface IngestResult {
  status: string;
  extracted_nodes: GraphNode[];
  extracted_edges: GraphEdge[];
  confidence_score: number;
  summary: string;
}
