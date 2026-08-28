import { GraphData, IndustryMeta, SimulationResult, ReskillPathway, IngestResult } from '../types/graph';

export const MOCK_INDUSTRIES: IndustryMeta[] = [
  {
    id: "banking_claims",
    name: "Banking & Insurance Claims",
    description: "Complex insurance claims processing, fraud detection, underwriting verification, and payout workflows.",
    icon: "ShieldCheck",
    node_count: 18,
    edge_count: 24,
    baseline_headcount: 120,
    baseline_cost: 8400000.0,
  },
  {
    id: "healthcare_clinical",
    name: "Healthcare Clinical Operations",
    description: "Patient clinical triage, medical records reconciliation, trial matching, and adverse event reporting.",
    icon: "Activity",
    node_count: 17,
    edge_count: 22,
    baseline_headcount: 95,
    baseline_cost: 9120000.0,
  },
  {
    id: "supply_chain",
    name: "Retail & E-Commerce Supply Chain",
    description: "Multi-tier demand forecasting, warehouse replenishment, supplier negotiation, and RMA logistics.",
    icon: "Truck",
    node_count: 16,
    edge_count: 20,
    baseline_headcount: 140,
    baseline_cost: 7700000.0,
  },
  {
    id: "software_cloud",
    name: "Enterprise Software & Cloud Ops",
    description: "Software development lifecycle (SDLC), QA testing, incident triage, and DevOps infrastructure.",
    icon: "Cpu",
    node_count: 17,
    edge_count: 23,
    baseline_headcount: 80,
    baseline_cost: 9600000.0,
  },
];

export const MOCK_BANKING_GRAPH: GraphData = {
  industry_id: "banking_claims",
  industry_name: "Banking & Insurance Claims",
  nodes: [
    // Processes (Column 1: X=40)
    {
      id: "p_intake",
      label: "Claims Intake & Indexing",
      type: "process",
      department: "Operations",
      description: "Ingesting claim forms, scanning damage receipts, and indexing policy holder documents.",
      status: "baseline",
      automation_potential: 0.85,
      complexity: "Low",
      source_citation: "SOP-FIN-01: Claims Intake Standard",
      position: { x: 40, y: 40 },
    },
    {
      id: "p_verify",
      label: "Policy Verification",
      type: "process",
      department: "Underwriting",
      description: "Verifying policy coverage limits, deductible eligibility, and active premium status.",
      status: "baseline",
      automation_potential: 0.70,
      complexity: "Medium",
      source_citation: "SOP-FIN-04: Coverage Verification Guide",
      position: { x: 40, y: 220 },
    },
    {
      id: "p_fraud",
      label: "Fraud Anomaly Screening",
      type: "process",
      department: "Risk & Compliance",
      description: "Running heuristic and behavioral pattern checks against fraudulent claim registries.",
      status: "baseline",
      automation_potential: 0.65,
      complexity: "High",
      source_citation: "Compliance Mandate SEC-88: Anti-Fraud Rules",
      position: { x: 40, y: 400 },
    },
    {
      id: "p_payout",
      label: "Adjudication & Settlement",
      type: "process",
      department: "Finance",
      description: "Final approval of payout amounts, issuing electronic fund transfers, and closing audits.",
      status: "baseline",
      automation_potential: 0.40,
      complexity: "High",
      source_citation: "SOP-FIN-12: Payout Authorization Limits",
      position: { x: 40, y: 580 },
    },
    // Roles (Column 2: X=350)
    {
      id: "r_processor",
      label: "Claims Processor",
      type: "role",
      department: "Operations",
      description: "Executes repetitive document intake, data entry, and baseline claim validation.",
      status: "at_risk",
      automation_potential: 0.0,
      headcount: 45,
      avg_salary: 52000.0,
      position: { x: 350, y: 40 },
    },
    {
      id: "r_underwriter",
      label: "Claims Underwriter",
      type: "role",
      department: "Underwriting",
      description: "Evaluates policy clauses, exceptions, and determines complex claim validity.",
      status: "augmented",
      automation_potential: 0.0,
      headcount: 30,
      avg_salary: 82000.0,
      position: { x: 350, y: 220 },
    },
    {
      id: "r_investigator",
      label: "Fraud Investigator",
      type: "role",
      department: "Risk & Compliance",
      description: "Conducts deep forensic investigations on suspicious high-value claims.",
      status: "augmented",
      automation_potential: 0.0,
      headcount: 25,
      avg_salary: 88000.0,
      position: { x: 350, y: 400 },
    },
    {
      id: "r_ai_strategist",
      label: "AI Claims Strategist (Future)",
      type: "role",
      department: "Transformation",
      description: "Oversees autonomous claim agents, audits model confidence, and refines exception rules.",
      status: "new_opportunity",
      automation_potential: 0.0,
      headcount: 0,
      avg_salary: 115000.0,
      position: { x: 350, y: 580 },
    },
    // Skills (Column 3: X=660)
    {
      id: "s_doc_indexing",
      label: "Document Indexing & OCR",
      type: "skill",
      department: "Operations",
      description: "Manual indexing of invoices, medical bills, and police incident reports.",
      status: "baseline",
      automation_potential: 0.0,
      complexity: "Low",
      position: { x: 660, y: 40 },
    },
    {
      id: "s_policy_eval",
      label: "Policy Clause Evaluation",
      type: "skill",
      department: "Underwriting",
      description: "Interpreting fine-print exclusions, liability limits, and subrogation rights.",
      status: "baseline",
      automation_potential: 0.0,
      complexity: "Medium",
      position: { x: 660, y: 180 },
    },
    {
      id: "s_anomaly_det",
      label: "Forensic Anomaly Detection",
      type: "skill",
      department: "Risk & Compliance",
      description: "Identifying suspicious behavioral metadata and forged documentation signatures.",
      status: "baseline",
      automation_potential: 0.0,
      complexity: "High",
      position: { x: 660, y: 320 },
    },
    {
      id: "s_prompt_eng",
      label: "Prompt Engineering & Auditing",
      type: "skill",
      department: "Transformation",
      description: "Writing domain-specific prompts and auditing LLM extraction accuracy.",
      status: "baseline",
      automation_potential: 0.0,
      complexity: "Medium",
      position: { x: 660, y: 460 },
    },
    {
      id: "s_model_gov",
      label: "AI Governance & HITL Validation",
      type: "skill",
      department: "Transformation",
      description: "Human-in-the-loop exception handling and ethical AI bias monitoring.",
      status: "baseline",
      automation_potential: 0.0,
      complexity: "High",
      position: { x: 660, y: 600 },
    },
    // AI Agents (Column 4: X=950)
    {
      id: "ai_doc_agent",
      label: "DocAI Ingestion Agent",
      type: "ai_agent",
      department: "AI Systems",
      description: "Autonomous multi-modal parser extracting structured JSON from invoices & photos.",
      status: "automated",
      automation_potential: 0.90,
      position: { x: 950, y: 100 },
    },
    {
      id: "ai_fraud_agent",
      label: "Fraud Sentinel Agent",
      type: "ai_agent",
      department: "AI Systems",
      description: "Real-time graph anomaly neural network cross-referencing industry fraud registries.",
      status: "augmented",
      automation_potential: 0.75,
      position: { x: 950, y: 340 },
    },
    {
      id: "ai_adjudicate_agent",
      label: "Auto-Adjudication Copilot",
      type: "ai_agent",
      department: "AI Systems",
      description: "Generates compliant settlement drafts and auto-approves low-risk claims under $2,000.",
      status: "augmented",
      automation_potential: 0.60,
      position: { x: 950, y: 560 },
    },
  ],
  edges: [
    { id: "e1", source: "r_processor", target: "p_intake", relation: "EXECUTES", weight: 1.0 },
    { id: "e2", source: "r_underwriter", target: "p_verify", relation: "EXECUTES", weight: 1.0 },
    { id: "e3", source: "r_investigator", target: "p_fraud", relation: "EXECUTES", weight: 1.0 },
    { id: "e4", source: "r_processor", target: "s_doc_indexing", relation: "REQUIRES_SKILL", weight: 0.9 },
    { id: "e5", source: "r_underwriter", target: "s_policy_eval", relation: "REQUIRES_SKILL", weight: 0.8 },
    { id: "e6", source: "r_investigator", target: "s_anomaly_det", relation: "REQUIRES_SKILL", weight: 0.9 },
    { id: "e7", source: "r_ai_strategist", target: "s_prompt_eng", relation: "REQUIRES_SKILL", weight: 0.85 },
    { id: "e8", source: "r_ai_strategist", target: "s_model_gov", relation: "REQUIRES_SKILL", weight: 0.95 },
    { id: "e9", source: "ai_doc_agent", target: "p_intake", relation: "AUTOMATES", weight: 0.85, is_impacted: true },
    { id: "e10", source: "ai_fraud_agent", target: "p_fraud", relation: "AUGMENTED_BY", weight: 0.70, is_impacted: true },
    { id: "e11", source: "ai_adjudicate_agent", target: "p_payout", relation: "AUGMENTED_BY", weight: 0.60, is_impacted: true },
    { id: "e12", source: "r_processor", target: "r_ai_strategist", relation: "TRANSITIONS_TO", weight: 2.5 },
  ],
  total_headcount: 120,
  baseline_annual_cost: 8400000.0,
};

export function getMockGraph(industryId: string): GraphData {
  return MOCK_BANKING_GRAPH;
}

export function mockSimulation(industryId: string, adoptionRate: number): SimulationResult {
  const adoption = Math.max(0, Math.min(1, adoptionRate));
  const graph = JSON.parse(JSON.stringify(MOCK_BANKING_GRAPH)) as GraphData;

  const displaced_hc = Math.round(45 * adoption * 0.45);
  const augmented_hc = Math.round(55 * adoption * 0.60);
  const new_copilot = Math.max(1, Math.round(displaced_hc * 0.28));
  const savings = Math.round((displaced_hc * 68000 * 0.85) + (augmented_hc * 68000 * 0.18));
  const hours_saved = Math.round((displaced_hc * 2080 * 0.80) + (augmented_hc * 2080 * 0.25));
  const auto_index = Math.round(adoption * 72.5);
  const hitl_safety = Math.round(Math.max(72, 100 - (adoption * 24.5)));

  graph.nodes.forEach(n => {
    if (n.type === 'process' && n.automation_potential * adoption >= 0.55) {
      n.status = 'automated';
    } else if (n.type === 'process' && n.automation_potential * adoption >= 0.25) {
      n.status = 'augmented';
    }
    if (n.id === 'r_processor') {
      n.status = adoption > 0.4 ? 'at_risk' : 'baseline';
    }
    if (n.id === 'r_ai_strategist') {
      n.headcount = new_copilot;
    }
  });

  return {
    graph,
    automation_index: auto_index,
    projected_cost_savings: savings,
    time_saved_hours_annual: hours_saved,
    impacted_roles_count: 3,
    displaced_headcount: displaced_hc,
    augmented_headcount: augmented_hc,
    new_ai_copilot_roles: new_copilot,
    human_in_loop_safety_score: hitl_safety,
    summary_insights: [
      `At ${Math.round(adoption * 100)}% AI adoption, the organization captures approximately $${savings.toLocaleString()} in net operational value.`,
      `${augmented_hc} knowledge workers are empowered with AI agents without headcount reduction.`,
      `${displaced_hc} routine processing roles flagged for high-velocity reskilling into ${new_copilot} AI Strategist positions.`,
      `Human-in-the-Loop safety score remains calibrated at ${hitl_safety}% for audit-ready compliance.`
    ]
  };
}

export function mockReskilling(industryId: string, sourceRoleId: string, targetRoleId: string): ReskillPathway {
  const source = MOCK_BANKING_GRAPH.nodes.find(n => n.id === sourceRoleId) || MOCK_BANKING_GRAPH.nodes[4];
  const target = MOCK_BANKING_GRAPH.nodes.find(n => n.id === targetRoleId) || MOCK_BANKING_GRAPH.nodes[7];

  return {
    source_role: source,
    target_role: target,
    shared_skills: ["Document Indexing & Policy Fundamentals"],
    delta_skills_to_acquire: [
      "Prompt Engineering & Structured JSON Extraction",
      "AI Governance & HITL Exception Auditing",
      "Model Drift & Compliance Verification"
    ],
    transition_feasibility_score: 84.5,
    total_estimated_weeks: 11,
    estimated_reskilling_cost: 10450.0,
    steps: [
      {
        step_number: 1,
        skill_id: "step_1",
        skill_name: "Prompt Engineering & Structured JSON Extraction",
        category: "AI & Technical Competency",
        difficulty: "Moderate",
        estimated_weeks: 3,
        learning_focus: "Hands-on lab modules, Pydantic schemas, and LLM structured prompt design."
      },
      {
        step_number: 2,
        skill_id: "step_2",
        skill_name: "AI Governance & HITL Exception Auditing",
        category: "Governance & Risk",
        difficulty: "Moderate",
        estimated_weeks: 4,
        learning_focus: "Auditing model confidence, regulatory compliance, and managing human-in-the-loop escalations."
      },
      {
        step_number: 3,
        skill_id: "step_3",
        skill_name: "Model Drift & Compliance Verification",
        category: "Advanced Intelligence",
        difficulty: "Advanced",
        estimated_weeks: 4,
        learning_focus: "Monitoring accuracy metrics, bias mitigation, and live transformation dashboard telemetry."
      }
    ],
    career_growth_multiplier: "+121% Salary Upside & 5-Year Career Longevity",
    rationale: `Transitioning from '${source.label}' to '${target.label}' builds on existing foundational domain knowledge while closing 3 high-leverage AI capability gaps over 11 weeks.`
  };
}

export function mockIngest(documentName: string, documentType: string, content: string, department: string): IngestResult {
  return {
    status: "success",
    extracted_nodes: [
      {
        id: "proc_ingested_1",
        label: `${documentName} Core Processing`,
        type: "process",
        department: department,
        description: `Extracted from ${documentName}`,
        status: "baseline",
        automation_potential: 0.75,
        position: { x: 40, y: 150 }
      },
      {
        id: "role_ingested_1",
        label: `${department} Operations Analyst`,
        type: "role",
        department: department,
        description: "Primary role identified in document",
        status: "at_risk",
        automation_potential: 0.0,
        headcount: 15,
        avg_salary: 62000,
        position: { x: 350, y: 150 }
      },
      {
        id: "skill_ingested_1",
        label: "Document Verification & Auditing",
        type: "skill",
        department: department,
        description: "Required operational skill",
        status: "baseline",
        automation_potential: 0.0,
        position: { x: 660, y: 150 }
      },
      {
        id: "ai_ingested_1",
        label: `Autonomous ${department} Copilot`,
        type: "ai_agent",
        department: "AI Systems",
        description: "Tailored AI intervention agent",
        status: "automated",
        automation_potential: 0.85,
        position: { x: 950, y: 150 }
      }
    ],
    extracted_edges: [
      { id: "e_ing_1", source: "role_ingested_1", target: "proc_ingested_1", relation: "EXECUTES", weight: 1.0 },
      { id: "e_ing_2", source: "role_ingested_1", target: "skill_ingested_1", relation: "REQUIRES_SKILL", weight: 0.9 },
      { id: "e_ing_3", source: "ai_ingested_1", target: "proc_ingested_1", relation: "AUTOMATES", weight: 0.85, is_impacted: true }
    ],
    confidence_score: 0.94,
    summary: `Successfully parsed '${documentName}'. Extracted 1 Process, 1 Role, 1 Competency, and 1 AI Copilot Opportunity with 94% confidence.`
  };
}
