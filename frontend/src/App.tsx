import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { Navbar } from './components/Navbar';
import { MetricsBar } from './components/MetricsBar';
import { SimulationDeck } from './components/SimulationDeck';
import { GraphCanvas } from './components/GraphCanvas';
import { ReskillModal } from './components/ReskillModal';
import { IngestionModal } from './components/IngestionModal';
import { NodeDetailDrawer } from './components/NodeDetailDrawer';
import { 
  GraphData, 
  IndustryMeta, 
  SimulationResult, 
  GraphNode, 
  IngestResult 
} from './types/graph';
import { apiService } from './services/api';

export function App() {
  const [industries, setIndustries] = useState<IndustryMeta[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('banking_claims');
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [adoptionRate, setAdoptionRate] = useState<number>(0.60);

  // Modals & Drawer state
  const [isReskillOpen, setIsReskillOpen] = useState(false);
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  // 1. Initial Load: Fetch Industries
  useEffect(() => {
    async function loadIndustries() {
      const data = await apiService.getIndustries();
      setIndustries(data);
    }
    loadIndustries();
  }, []);

  // 2. Load Graph & Run Simulation on Industry / Adoption Change
  useEffect(() => {
    async function updateSimulation() {
      const simResult = await apiService.runSimulation(selectedIndustry, adoptionRate);
      setSimulation(simResult);
      setGraphData(simResult.graph);
    }
    updateSimulation();
  }, [selectedIndustry, adoptionRate]);

  // Handle Ingested Subgraph
  const handleIngestSuccess = (result: IngestResult) => {
    if (!graphData) return;
    const updatedNodes = [...graphData.nodes, ...result.extracted_nodes];
    const updatedEdges = [...graphData.edges, ...result.extracted_edges];
    setGraphData({
      ...graphData,
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  };

  // Reset Graph to Industry Baseline
  const handleReset = () => {
    setAdoptionRate(0.0);
  };

  // Export C-Level Executive PDF Brief
  const handleExportPDF = () => {
    if (!simulation || !graphData) return;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(30, 41, 59);
    doc.text("NexusTransform AI — Enterprise Transformation Dossier", 14, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`Domain: ${graphData.industry_name}  |  Generated on: ${new Date().toLocaleDateString()}`, 14, 29);

    doc.setDrawColor(203, 213, 225);
    doc.line(14, 34, 196, 34);

    // Section 1: Executive KPI Metrics
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("1. Transformation Financial & Operational Impact", 14, 44);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`• AI Adoption Rate: ${Math.round(adoptionRate * 100)}%`, 18, 52);
    doc.text(`• Projected Net Annual Savings: $${simulation.projected_cost_savings.toLocaleString()}`, 18, 59);
    doc.text(`• Enterprise Automation Index: ${simulation.automation_index}%`, 18, 66);
    doc.text(`• Annual Capacity Reclaimed: ${Math.round(simulation.time_saved_hours_annual).toLocaleString()} Hours`, 18, 73);
    doc.text(`• Augmented Knowledge Workers: ${simulation.augmented_headcount} Staff`, 18, 80);
    doc.text(`• Displaced Roles Queued for Reskilling: ${simulation.displaced_headcount} Staff`, 18, 87);
    doc.text(`• Human-in-the-Loop (HITL) Safety Governance: ${simulation.human_in_loop_safety_score}%`, 18, 94);

    // Section 2: Strategic Insights
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("2. Strategic Transformation Insights", 14, 108);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    simulation.summary_insights.forEach((insight, idx) => {
      doc.text(`• ${insight}`, 18, 116 + (idx * 8));
    });

    // Section 3: Process x Role x Skill Matrix
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("3. Core Knowledge Graph Topology Breakdown", 14, 154);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const processes = graphData.nodes.filter(n => n.type === 'process');
    const roles = graphData.nodes.filter(n => n.type === 'role');
    const agents = graphData.nodes.filter(n => n.type === 'ai_agent');

    doc.text(`• Business Processes Analyzed: ${processes.map(p => p.label).join(', ')}`, 18, 162, { maxWidth: 175 });
    doc.text(`• Core Workforce Roles: ${roles.map(r => r.label).join(', ')}`, 18, 174, { maxWidth: 175 });
    doc.text(`• Autonomous AI Agents Deployed: ${agents.map(a => a.label).join(', ')}`, 18, 186, { maxWidth: 175 });

    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.text("NexusTransform AI • Built for Modus ETI / Microsoft Enterprise Challenge • Confidential", 14, 285);

    doc.save(`NexusTransform_Executive_Dossier_${selectedIndustry}.pdf`);
  };

  const roleNodes = graphData ? graphData.nodes.filter(n => n.type === 'role') : [];

  return (
    <div className="w-screen h-screen flex flex-col bg-[#090d16] text-slate-100 overflow-hidden">
      {/* Top Navigation */}
      <Navbar
        industries={industries}
        selectedIndustry={selectedIndustry}
        onSelectIndustry={setSelectedIndustry}
        onOpenIngest={() => setIsIngestOpen(true)}
        onOpenReskill={() => setIsReskillOpen(true)}
        onExportPDF={handleExportPDF}
        onReset={handleReset}
      />

      {/* Top Metrics Scorecard */}
      <MetricsBar
        simulation={simulation}
        baselineCost={graphData?.baseline_annual_cost || 0}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: What-If Simulation Deck */}
        <SimulationDeck
          adoptionRate={adoptionRate}
          onAdoptionChange={setAdoptionRate}
          simulation={simulation}
        />

        {/* Center: React Flow Interactive Knowledge Graph */}
        <div className="flex-1 h-full relative">
          <GraphCanvas
            graphData={graphData}
            onNodeClick={(node) => setSelectedNode(node)}
          />
        </div>

        {/* Right: Node Detail Drawer */}
        {selectedNode && (
          <NodeDetailDrawer
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </div>

      {/* Reskilling Optimizer Modal */}
      <ReskillModal
        isOpen={isReskillOpen}
        onClose={() => setIsReskillOpen(false)}
        industryId={selectedIndustry}
        roles={roleNodes}
      />

      {/* SOP / JD Ingestion Modal */}
      <IngestionModal
        isOpen={isIngestOpen}
        onClose={() => setIsIngestOpen(false)}
        onIngestSuccess={handleIngestSuccess}
      />
    </div>
  );
}

export default App;
