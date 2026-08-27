from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..models.graph_models import (
    GraphData,
    IndustryMeta,
    SimulationRequest,
    SimulationResult,
    ReskillRequest,
    ReskillPathway,
    IngestRequest,
    IngestResult,
)
from ..data.industry_datasets import INDUSTRY_METADATA, get_industry_graph
from ..services.graph_service import GraphEngineService
from ..agents.extractor_agent import DocumentExtractionAgent

router = APIRouter()


@router.get("/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "service": "NexusTransform AI Engine",
        "version": "2.0.0",
        "algorithms": ["Dijkstra Reskill", "BFS Cascade Simulation", "LLM Extraction"],
    }


@router.get("/industries", response_model=List[IndustryMeta], tags=["Ontology"])
def list_industries():
    """Returns all pre-loaded industry ontology packs."""
    return INDUSTRY_METADATA


@router.get("/graph/{industry_id}", response_model=GraphData, tags=["Knowledge Graph"])
def get_graph(industry_id: str):
    """Fetches the full Process x Role x Skill Knowledge Graph for an industry."""
    try:
        return get_industry_graph(industry_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Industry graph '{industry_id}' not found: {str(e)}")


@router.post("/simulate", response_model=SimulationResult, tags=["Simulation"])
def run_simulation(request: SimulationRequest):
    """
    Executes a real-time 'What-If' AI transformation simulation,
    propagating adoption cascade impacts to processes, roles, and financials.
    """
    try:
        return GraphEngineService.run_simulation(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")


@router.post("/reskill", response_model=ReskillPathway, tags=["Reskilling Optimizer"])
def calculate_reskilling(request: ReskillRequest):
    """
    Calculates the optimal shortest-path reskilling transition between
    a source displaced role and target future AI-augmented role.
    """
    try:
        return GraphEngineService.calculate_reskilling_pathway(
            industry_id=request.industry_id,
            source_role_id=request.source_role_id,
            target_role_id=request.target_role_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reskilling calculation error: {str(e)}")


@router.post("/ingest", response_model=IngestResult, tags=["Document Ingestion"])
def ingest_document(request: IngestRequest):
    """
    Ingests unstructured SOPs or Job Descriptions, extracting typed
    Process, Role, Skill, and AI Agent nodes dynamically.
    """
    try:
        if not request.content.strip():
            raise HTTPException(status_code=400, detail="Document content cannot be empty.")
        return DocumentExtractionAgent.extract_from_document(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion error: {str(e)}")
