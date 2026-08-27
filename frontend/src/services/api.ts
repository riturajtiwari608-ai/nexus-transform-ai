import axios from 'axios';
import { GraphData, IndustryMeta, SimulationResult, ReskillPathway, IngestResult } from '../types/graph';
import { MOCK_INDUSTRIES, getMockGraph, mockSimulation, mockReskilling, mockIngest } from '../data/mockData';

const API_BASE = '/api';

export const apiService = {
  async getIndustries(): Promise<IndustryMeta[]> {
    try {
      const res = await axios.get(`${API_BASE}/industries`);
      return res.data;
    } catch {
      return MOCK_INDUSTRIES;
    }
  },

  async getGraph(industryId: string): Promise<GraphData> {
    try {
      const res = await axios.get(`${API_BASE}/graph/${industryId}`);
      return res.data;
    } catch {
      return getMockGraph(industryId);
    }
  },

  async runSimulation(industryId: string, adoptionRate: number): Promise<SimulationResult> {
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
