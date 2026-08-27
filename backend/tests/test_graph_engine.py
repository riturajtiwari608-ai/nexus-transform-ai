import pytest
from fastapi.testclient import TestClient
from main import app
from app.data.industry_datasets import INDUSTRY_METADATA, get_industry_graph
from app.models.graph_models import SimulationRequest, ReskillRequest, IngestRequest, NodeType
from app.services.graph_service import GraphEngineService
from app.agents.extractor_agent import DocumentExtractionAgent

client = TestClient(app)


def test_api_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "NexusTransform" in data["service"]


def test_list_industries():
    response = client.get("/api/industries")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 4
    industry_ids = [item["id"] for item in data]
    assert "banking_claims" in industry_ids
    assert "healthcare_clinical" in industry_ids
    assert "supply_chain" in industry_ids
    assert "software_cloud" in industry_ids


def test_get_graph_data():
    for ind in ["banking_claims", "healthcare_clinical", "supply_chain", "software_cloud"]:
        response = client.get(f"/api/graph/{ind}")
        assert response.status_code == 200
        data = response.json()
        assert len(data["nodes"]) > 0
        assert len(data["edges"]) > 0
        
        # Verify node types exist
        node_types = {n["type"] for n in data["nodes"]}
        assert "process" in node_types
        assert "role" in node_types
        assert "skill" in node_types


def test_simulation_engine():
    # Test with 70% adoption
    req = SimulationRequest(industry_id="banking_claims", ai_adoption_rate=0.7)
    res = GraphEngineService.run_simulation(req)
    
    assert res.automation_index > 0.0
    assert res.projected_cost_savings > 0.0
    assert res.displaced_headcount >= 0
    assert res.augmented_headcount > 0
    assert res.human_in_loop_safety_score >= 70.0
    assert len(res.summary_insights) >= 3


def test_reskilling_optimizer():
    graph = get_industry_graph("banking_claims")
    roles = [n for n in graph.nodes if n.type == NodeType.ROLE]
    source_role = roles[0].id
    target_role = roles[-1].id

    pathway = GraphEngineService.calculate_reskilling_pathway(
        industry_id="banking_claims",
        source_role_id=source_role,
        target_role_id=target_role,
    )

    assert pathway.source_role.id == source_role
    assert pathway.target_role.id == target_role
    assert len(pathway.steps) > 0
    assert pathway.transition_feasibility_score >= 60.0
    assert pathway.total_estimated_weeks > 0


def test_document_ingestion():
    sample_sop = """
    Standard Operating Procedure: Autonomous Invoice Triaging
    Procedure: The Invoice Auditor verifies tax compliance and parses line-item totals.
    Required Skills: Tax Law Auditing, SQL Querying, Prompt Engineering.
    Role: Junior Invoice Analyst
    """
    req = IngestRequest(
        document_name="SOP-FIN-Invoice",
        document_type="SOP",
        content=sample_sop,
        target_department="Finance",
    )
    res = DocumentExtractionAgent.extract_from_document(req)
    
    assert res.status == "success"
    assert len(res.extracted_nodes) >= 3
    assert len(res.extracted_edges) >= 2
    assert res.confidence_score > 0.70
