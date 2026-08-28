import axios from 'axios';
import { GraphData, IndustryMeta, SimulationResult, ReskillPathway, IngestResult } from '../types/graph';
import { MOCK_INDUSTRIES, getMockGraph, mockSimulation, mockReskilling, mockIngest } from '../data/mockData';

// If running locally, proxy to /api. On static deployments without VITE_API_URL, use instant in-memory intelligence engine.
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE = import.meta.env.VITE_API_URL || (isLocalhost ? '/api' : null);

export const apiService = {
  async getIndustries(): Promise<IndustryMeta[]> {
    if (!API_BASE) return MOCK_INDUSTRIES;
    try {
      const res = await axios.get(`${API_BASE}/industries`);
      return res.data;
    } catch {
      return MOCK_INDUSTRIES;
    }
  },

  async getGraph(industryId: string): Promise<GraphData> {
    if (!API_BASE) return getMockGraph(industryId);
    try {
      const res = await axios.get(`${API_BASE}/graph/${industryId}`);
      return res.data;
    } catch {
      return getMockGraph(industryId);
    }
  },

  async runSimulation(industryId: string, adoptionRate: number): Promise<SimulationResult> {
    if (!API_BASE) return mockSimulation(industryId, adoptionRate);
    try {
      const res = await axios.post(`${API_BASE}/simulate`, {
        industry_id: industryId,
        ai_adoption_rate: adoptionRate,
      });
      return res.data;
    } catch {
      return mockSimulation(industryId, adoptionRate);
    }
  },

  async getReskillingPathway(industryId: string, sourceRoleId: string, targetRoleId: string): Promise<ReskillPathway> {
    if (!API_BASE) return mockReskilling(industryId, sourceRoleId, targetRoleId);
    try {
      const res = await axios.post(`${API_BASE}/reskill`, {
        industry_id: industryId,
        source_role_id: sourceRoleId,
        target_role_id: targetRoleId,
      });
      return res.data;
    } catch {
      return mockReskilling(industryId, sourceRoleId, targetRoleId);
    }
  },

  async ingestDocument(documentName: string, documentType: string, content: string, department: string): Promise<IngestResult> {
    if (!API_BASE) return mockIngest(documentName, documentType, content, department);
    try {
      const res = await axios.post(`${API_BASE}/ingest`, {
        document_name: documentName,
        document_type: documentType,
        content,
        target_department: department,
      });
      return res.data;
    } catch {
      return mockIngest(documentName, documentType, content, department);
    }
  }
};
