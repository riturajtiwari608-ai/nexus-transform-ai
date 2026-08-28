import React, { useMemo, useEffect } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  Node, 
  Edge,
  MarkerType,
  ConnectionLineType,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GraphData, GraphNode } from '../types/graph';
import { nodeTypes } from './CustomNodes';

interface GraphCanvasProps {
  graphData: GraphData | null;
  onNodeClick: (node: GraphNode) => void;
}

const GraphCanvasInner: React.FC<GraphCanvasProps> = ({ graphData, onNodeClick }) => {
  const { fitView } = useReactFlow();

  // Convert GraphNode -> React Flow Node
  const nodes: any[] = useMemo(() => {
    if (!graphData) return [];
    return graphData.nodes.map((n) => ({
      id: n.id,
      type: n.type,
      data: n,
      position: n.position || { x: 100, y: 100 },
    }));
  }, [graphData]);

  // Convert GraphEdge -> React Flow Edge
  const edges: any[] = useMemo(() => {
    if (!graphData) return [];
    return graphData.edges.map((e) => {
      let strokeColor = '#475569';
      let animated = false;
      let strokeWidth = 1.5;

      if (e.relation === 'AUTOMATES') {
        strokeColor = '#a855f7'; // Purple
        animated = e.is_impacted || false;
        strokeWidth = 2.5;
      } else if (e.relation === 'AUGMENTED_BY') {
        strokeColor = '#6366f1'; // Indigo
        animated = e.is_impacted || false;
        strokeWidth = 2;
      } else if (e.relation === 'EXECUTES') {
        strokeColor = '#10b981'; // Emerald
        strokeWidth = 1.8;
      } else if (e.relation === 'REQUIRES_SKILL') {
        strokeColor = '#f59e0b'; // Amber
        strokeWidth = 1.5;
      } else if (e.relation === 'TRANSITIONS_TO') {
        strokeColor = '#ec4899'; // Pink
        animated = true;
        strokeWidth = 2;
      }

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated,
        label: e.relation.replace('_', ' '),
        labelStyle: { fill: '#94a3b8', fontSize: 9, fontFamily: 'monospace', fontWeight: 600 },
        labelBgStyle: { fill: '#0f172a', fillOpacity: 0.85, stroke: '#334155', strokeWidth: 0.5 },
        labelBgPadding: [4, 2],
        labelBgBorderRadius: 4,
        style: { stroke: strokeColor, strokeWidth },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
          width: 14,
          height: 14,
        },
      };
    });
  }, [graphData]);

  // Auto-center and fit view when nodes change or industry switches
  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.15, duration: 600 });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [graphData?.industry_id, nodes.length, fitView]);

  return (
    <div className="w-full h-full relative bg-[#090d16]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick(node.data as GraphNode)}
        fitView
        fitViewOptions={{ padding: 0.15, duration: 600 }}
        minZoom={0.1}
        maxZoom={2.0}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1.2} 
          color="#1e293b" 
        />
        <Controls position="bottom-right" />
      </ReactFlow>
    </div>
  );
};

export const GraphCanvas: React.FC<GraphCanvasProps> = (props) => (
  <ReactFlowProvider>
    <GraphCanvasInner {...props} />
  </ReactFlowProvider>
);
