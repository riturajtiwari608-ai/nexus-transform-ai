import { GraphData, IndustryMeta, SimulationResult, ReskillPathway, IngestResult } from '../types/graph';

export const MOCK_INDUSTRIES: IndustryMeta[] = [
  {
    id: "banking_claims",
    name: "Banking & Insurance Claims",
    description: "Complex insurance claims processing, fraud detection, underwriting verification, and payout workflows.",
    icon: "ShieldCheck",
    node_count: 15,
    edge_count: 12,
    baseline_headcount: 120,
    baseline_cost: 8400000.0,
  },
  {
    id: "healthcare_clinical",
    name: "Healthcare Clinical Operations",
    description: "Patient clinical triage, medical records reconciliation, trial matching, and adverse event reporting.",
    icon: "Activity",
    node_count: 10,
    edge_count: 8,
    baseline_headcount: 95,
    baseline_cost: 9120000.0,
  },
  {
    id: "supply_chain",
    name: "Retail & E-Commerce Supply Chain",
    description: "Multi-tier demand forecasting, warehouse replenishment, supplier negotiation, and RMA logistics.",
    icon: "Truck",
    node_count: 10,
    edge_count: 7,
    baseline_headcount: 140,
    baseline_cost: 7700000.0,
  },
  {
    id: "software_cloud",
    name: "Enterprise Software & Cloud Ops",
    description: "Software development lifecycle (SDLC), QA testing, incident triage, and DevOps infrastructure.",
    icon: "Cpu",
    node_count: 10,
    edge_count: 7,
    baseline_headcount: 80,
    baseline_cost: 9600000.0,
  },
];

// 1. Banking & Insurance Claims
export const MOCK_BANKING_GRAPH: GraphData = {
  industry_id: "banking_claims",
  industry_name: "Banking & Insurance Claims",
  nodes: [
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

// 2. Healthcare Clinical Operations
export const MOCK_HEALTHCARE_GRAPH: GraphData = {
  industry_id: "healthcare_clinical",
  industry_name: "Healthcare Clinical Operations",
  nodes: [
    {
      id: "hc_p_intake",
      label: "Patient Triage & Intake",
      type: "process",
      department: "Clinical",
      description: "Patient symptom logging, vitals recording, and immediate triage categorization.",
      status: "baseline",
      automation_potential: 0.60,
      position: { x: 40, y: 60 },
    },
    {
      id: "hc_p_scribe",
      label: "Physician Scribing & Notes",
      type: "process",
      department: "Clinical",
      description: "Transcribing patient-doctor dialogues and formatting SOAP medical progress notes.",
      status: "baseline",
      automation_potential: 0.85,
      position: { x: 40, y: 260 },
    },
    {
      id: "hc_p_trial",
      label: "Clinical Trial Patient Matching",
      type: "process",
      department: "Research",
      description: "Cross-referencing patient genomic markers and history against open clinical trial criteria.",
      status: "baseline",
      automation_potential: 0.75,
      position: { x: 40, y: 460 },
    },
    {
      id: "hc_r_nurse",
      label: "Triage Nurse",
      type: "role",
      department: "Clinical",
      description: "Conducts bedside patient evaluation, emergency classification, and preliminary care.",
      status: "augmented",
      headcount: 40,
      avg_salary: 85000.0,
      position: { x: 350, y: 60 },
    },
    {
      id: "hc_r_scribe",
      label: "Medical Scribe",
      type: "role",
      department: "Clinical",
      description: "Manual documentation specialist entering patient notes into EHR systems.",
      status: "at_risk",
      headcount: 25,
      avg_salary: 42000.0,
      position: { x: 350, y: 260 },
    },
    {
      id: "hc_r_ai_clinical_auditor",
      label: "AI Clinical Validation Lead",
      type: "role",
      department: "Transformation",
      description: "Validates ambient AI notes for hallucination and monitors clinical decision support algorithms.",
      status: "new_opportunity",
      headcount: 0,
      avg_salary: 110000.0,
      position: { x: 350, y: 500 },
    },
    {
      id: "hc_s_ehr_entry",
      label: "EHR Data Entry & Scribing",
      type: "skill",
      department: "Clinical",
      description: "Typing and categorizing patient histories in Epic/Cerner systems.",
      status: "baseline",
      complexity: "Low",
      position: { x: 660, y: 120 },
    },
    {
      id: "hc_s_prompt_clinical",
      label: "Clinical Prompt Auditing & HITL",
      type: "skill",
      department: "Transformation",
      description: "Auditing ambient AI transcriptions against medical standards for safety.",
      status: "baseline",
      complexity: "High",
      position: { x: 660, y: 380 },
    },
    {
      id: "hc_ai_ambient_scribe",
      label: "Ambient Clinical Scribe AI",
      type: "ai_agent",
      department: "AI Systems",
      description: "Listens to patient-physician dialogue and auto-generates structured EHR progress notes.",
      status: "automated",
      automation_potential: 0.88,
      position: { x: 950, y: 200 },
    },
  ],
  edges: [
    { id: "hc_e1", source: "hc_r_nurse", target: "hc_p_intake", relation: "EXECUTES", weight: 1.0 },
    { id: "hc_e2", source: "hc_r_scribe", target: "hc_p_scribe", relation: "EXECUTES", weight: 1.0 },
    { id: "hc_e3", source: "hc_r_scribe", target: "hc_s_ehr_entry", relation: "REQUIRES_SKILL", weight: 0.9 },
    { id: "hc_e4", source: "hc_ai_ambient_scribe", target: "hc_p_scribe", relation: "AUTOMATES", weight: 0.88, is_impacted: true },
    { id: "hc_e5", source: "hc_r_scribe", target: "hc_r_ai_clinical_auditor", relation: "TRANSITIONS_TO", weight: 2.0 },
    { id: "hc_e6", source: "hc_r_ai_clinical_auditor", target: "hc_s_prompt_clinical", relation: "REQUIRES_SKILL", weight: 0.9 },
  ],
  total_headcount: 95,
  baseline_annual_cost: 9120000.0,
};

// 3. Retail & E-Commerce Supply Chain
export const MOCK_SUPPLY_CHAIN_GRAPH: GraphData = {
  industry_id: "supply_chain",
  industry_name: "Retail & E-Commerce Supply Chain",
  nodes: [
    {
      id: "sc_p_forecast",
      label: "Demand Sensing & Forecasting",
      type: "process",
      department: "Planning",
      description: "Forecasting seasonal SKU velocity across distribution centers.",
      status: "baseline",
      automation_potential: 0.80,
      position: { x: 40, y: 80 },
    },
    {
      id: "sc_p_route",
      label: "Dynamic Fleet Route Dispatch",
      type: "process",
      department: "Logistics",
      description: "Optimizing last-mile delivery multi-stop routing factoring traffic.",
      status: "baseline",
      automation_potential: 0.75,
      position: { x: 40, y: 320 },
    },
    {
      id: "sc_r_planner",
      label: "Demand Planner",
      type: "role",
      department: "Planning",
      description: "Builds monthly baseline forecasts using legacy ERP spreadsheets.",
      status: "augmented",
      headcount: 35,
      avg_salary: 65000.0,
      position: { x: 350, y: 80 },
    },
    {
      id: "sc_r_dispatcher",
      label: "Route Dispatcher",
      type: "role",
      department: "Logistics",
      description: "Manages driver schedules, traffic delays, and route adjustments.",
      status: "at_risk",
      headcount: 45,
      avg_salary: 50000.0,
      position: { x: 350, y: 320 },
    },
    {
      id: "sc_r_ai_logistics_lead",
      label: "AI Fleet Logistics Lead",
      type: "role",
      department: "Transformation",
      description: "Configures dynamic autonomous fleet routing models.",
      status: "new_opportunity",
      headcount: 0,
      avg_salary: 105000.0,
      position: { x: 350, y: 540 },
    },
    {
      id: "sc_s_dispatch",
      label: "Manual Route Scheduling",
      type: "skill",
      department: "Logistics",
      description: "Assigning stops manually via map sheets.",
      status: "baseline",
      complexity: "Low",
      position: { x: 660, y: 200 },
    },
    {
      id: "sc_s_ai_fleet_ops",
      label: "Autonomous Fleet Optimization",
      type: "skill",
      department: "Transformation",
      description: "Supervising algorithmic fleet routing and geofence triggers.",
      status: "baseline",
      complexity: "High",
      position: { x: 660, y: 460 },
    },
    {
      id: "sc_ai_route_agent",
      label: "Autonomous Fleet Dispatch Agent",
      type: "ai_agent",
      department: "AI Systems",
      description: "Real-time multi-agent routing optimizer reducing fleet fuel.",
      status: "automated",
      automation_potential: 0.85,
      position: { x: 950, y: 260 },
    },
  ],
  edges: [
    { id: "sc_e1", source: "sc_r_dispatcher", target: "sc_p_route", relation: "EXECUTES", weight: 1.0 },
    { id: "sc_e2", source: "sc_r_dispatcher", target: "sc_s_dispatch", relation: "REQUIRES_SKILL", weight: 0.9 },
    { id: "sc_e3", source: "sc_ai_route_agent", target: "sc_p_route", relation: "AUTOMATES", weight: 0.85, is_impacted: true },
    { id: "sc_e4", source: "sc_r_dispatcher", target: "sc_r_ai_logistics_lead", relation: "TRANSITIONS_TO", weight: 2.2 },
    { id: "sc_e5", source: "sc_r_ai_logistics_lead", target: "sc_s_ai_fleet_ops", relation: "REQUIRES_SKILL", weight: 0.9 },
  ],
  total_headcount: 140,
  baseline_annual_cost: 7700000.0,
};

// 4. Enterprise Software & Cloud Ops
export const MOCK_SOFTWARE_CLOUD_GRAPH: GraphData = {
  industry_id: "software_cloud",
  industry_name: "Enterprise Software & Cloud Ops",
  nodes: [
    {
      id: "dev_p_pr_review",
      label: "Code Implementation & PR Review",
      type: "process",
      department: "Engineering",
      description: "Writing application features and reviewing pull requests for architectural standards.",
      status: "baseline",
      automation_potential: 0.55,
      position: { x: 40, y: 80 },
    },
    {
      id: "dev_p_qa",
      label: "Regression & End-to-End QA Testing",
      type: "process",
      department: "Quality Assurance",
      description: "Designing manual and automated test cases, reporting defects, and regression checks.",
      status: "baseline",
      automation_potential: 0.75,
      position: { x: 40, y: 320 },
    },
    {
      id: "dev_r_qa_tester",
      label: "Manual QA Engineer",
      type: "role",
      department: "Quality Assurance",
      description: "Performs manual exploratory testing and manual defect logging.",
      status: "at_risk",
      headcount: 20,
      avg_salary: 60000.0,
      position: { x: 350, y: 140 },
    },
    {
      id: "dev_r_ai_qa_lead",
      label: "AI QA & Reliability Lead",
      type: "role",
      department: "Transformation",
      description: "Architects autonomous LLM testing agents and synthetic test data generators.",
      status: "new_opportunity",
      headcount: 0,
      avg_salary: 130000.0,
      position: { x: 350, y: 480 },
    },
    {
      id: "dev_s_manual_test",
      label: "Manual Test Case Writing",
      type: "skill",
      department: "Quality Assurance",
      description: "Writing step-by-step test plans in Excel or TestRail.",
      status: "baseline",
      complexity: "Low",
      position: { x: 660, y: 140 },
    },
    {
      id: "dev_s_agent_qa",
      label: "Agentic AI Test Engineering",
      type: "skill",
      department: "Transformation",
      description: "Building multi-agent automated testing suites with LLMs and self-healing test scripts.",
      status: "baseline",
      complexity: "High",
      position: { x: 660, y: 420 },
    },
    {
      id: "dev_ai_qa_agent",
      label: "Autonomous QA & Test Agent",
      type: "ai_agent",
      department: "AI Systems",
      description: "Parses PR diffs, writes boundary test cases, and executes self-healing regressions.",
      status: "automated",
      automation_potential: 0.80,
      position: { x: 950, y: 240 },
    },
  ],
  edges: [
    { id: "dev_e1", source: "dev_r_qa_tester", target: "dev_p_qa", relation: "EXECUTES", weight: 1.0 },
    { id: "dev_e2", source: "dev_r_qa_tester", target: "dev_s_manual_test", relation: "REQUIRES_SKILL", weight: 0.9 },
    { id: "dev_e3", source: "dev_ai_qa_agent", target: "dev_p_qa", relation: "AUTOMATES", weight: 0.80, is_impacted: true },
    { id: "dev_e4", source: "dev_r_qa_tester", target: "dev_r_ai_qa_lead", relation: "TRANSITIONS_TO", weight: 1.7 },
    { id: "dev_e5", source: "dev_r_ai_qa_lead", target: "dev_s_agent_qa", relation: "REQUIRES_SKILL", weight: 0.95 },
  ],
  total_headcount: 80,
  baseline_annual_cost: 9600000.0,
};

const INDUSTRY_GRAPHS: Record<string, GraphData> = {
  banking_claims: MOCK_BANKING_GRAPH,
  healthcare_clinical: MOCK_HEALTHCARE_GRAPH,
  supply_chain: MOCK_SUPPLY_CHAIN_GRAPH,
  software_cloud: MOCK_SOFTWARE_CLOUD_GRAPH,
};

export function getMockGraph(industryId: string): GraphData {
  return INDUSTRY_GRAPHS[industryId] || MOCK_BANKING_GRAPH;
}

export function mockSimulation(industryId: string, adoptionRate: number): SimulationResult {
  const baseGraph = getMockGraph(industryId);
  const adoption = Math.max(0, Math.min(1, adoptionRate));
  const graph = JSON.parse(JSON.stringify(baseGraph)) as GraphData;

  const totalHc = baseGraph.total_headcount || 100;
  const displaced_hc = Math.round(totalHc * 0.35 * adoption);
  const augmented_hc = Math.round(totalHc * 0.55 * adoption);
  const new_copilot = Math.max(1, Math.round(displaced_hc * 0.3));
  const avgSal = (baseGraph.baseline_annual_cost / totalHc) || 75000;
  const savings = Math.round((displaced_hc * avgSal * 0.85) + (augmented_hc * avgSal * 0.18));
  const hours_saved = Math.round((displaced_hc * 2080 * 0.80) + (augmented_hc * 2080 * 0.25));
  const auto_index = Math.round(adoption * 72.5);
  const hitl_safety = Math.round(Math.max(70, 100 - (adoption * 24.5)));

  graph.nodes.forEach(n => {
    if (n.type === 'process' && n.automation_potential * adoption >= 0.50) {
      n.status = 'automated';
    } else if (n.type === 'process' && n.automation_potential * adoption >= 0.20) {
      n.status = 'augmented';
    }
    if (n.type === 'role' && n.status === 'at_risk') {
      n.status = adoption > 0.3 ? 'at_risk' : 'baseline';
    }
    if (n.type === 'role' && n.status === 'new_opportunity') {
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
      `At ${Math.round(adoption * 100)}% AI adoption across ${baseGraph.industry_name}, organization captures ~$${savings.toLocaleString()} in net annual ROI.`,
      `${augmented_hc} knowledge workers operate with autonomous AI agent co-pilots with 0 workforce friction.`,
      `${displaced_hc} routine manual roles queued for fast-track algorithmic reskilling into ${new_copilot} AI Lead positions.`,
      `Human-in-the-Loop safety score calibrated at ${hitl_safety}% for enterprise audit compliance.`
    ]
  };
}

export function mockReskilling(industryId: string, sourceRoleId: string, targetRoleId: string): ReskillPathway {
  const currentGraph = getMockGraph(industryId);
  const roles = currentGraph.nodes.filter(n => n.type === 'role');
  const source = roles.find(n => n.id === sourceRoleId) || roles[0] || MOCK_BANKING_GRAPH.nodes[4];
  const target = roles.find(n => n.id === targetRoleId) || roles[roles.length - 1] || MOCK_BANKING_GRAPH.nodes[7];

  return {
    source_role: source,
    target_role: target,
    shared_skills: ["Core Operational Domain Knowledge", "Systems Navigation & Data Literacy"],
    delta_skills_to_acquire: [
      "Agentic AI Prompt Engineering & API Orchestration",
      "Model Drift & Output Reliability Auditing",
      "Human-in-the-Loop Exception Management"
    ],
    transition_feasibility_score: 87.5,
    total_estimated_weeks: 10,
    estimated_reskilling_cost: 9800.0,
    steps: [
      {
        step_number: 1,
        skill_id: "step_1",
        skill_name: "Agentic AI Prompt Engineering & API Orchestration",
        category: "AI & Technical Systems",
        difficulty: "Moderate",
        estimated_weeks: 3,
        learning_focus: "Hands-on labs on LLM prompt formulation, schema validation, and copilot orchestration."
      },
      {
        step_number: 2,
        skill_id: "step_2",
        skill_name: "Model Drift & Output Reliability Auditing",
        category: "Quality & Governance",
        difficulty: "Moderate",
        estimated_weeks: 3,
        learning_focus: "Evaluating automated outputs, spotting hallucinations, and tuning guardrails."
      },
      {
        step_number: 3,
        skill_id: "step_3",
        skill_name: "Human-in-the-Loop Exception Management",
        category: "Strategic Transformation",
        difficulty: "Advanced",
        estimated_weeks: 4,
        learning_focus: "Supervising automated multi-agent pipelines and resolving complex edge cases."
      }
    ],
    career_growth_multiplier: "+115% Salary Growth & Long-Term Transformation Longevity",
    rationale: `Direct shortest-path transition from '${source.label}' to '${target.label}' leveraging existing domain expertise while bridging AI competency gaps in 10 weeks.`
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
