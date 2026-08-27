import React from 'react';
import { 
  X, 
  Layers, 
  User, 
  Cpu, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  FileText,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { GraphNode } from '../types/graph';

interface NodeDetailDrawerProps {
  node: GraphNode | null;
  onClose: () => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({ node, onClose }) => {
  if (!node) return null;

  const getTypeIcon = () => {
    switch (node.type) {
      case 'process': return <Layers className="w-5 h-5 text-sky-400" />;
      case 'role': return <User className="w-5 h-5 text-emerald-400" />;
      case 'skill': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'ai_agent': return <Bot className="w-5 h-5 text-purple-400" />;
    }
  };

  const getTypeColor = () => {
    switch (node.type) {
      case 'process': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'role': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'skill': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'ai_agent': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    }
  };

  return (
    <div className="w-88 h-full border-l border-slate-800/80 bg-surface/90 backdrop-blur-xl flex flex-col justify-between p-5 overflow-y-auto z-20 shadow-2xl transition-all">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${getTypeColor()}`}>
              {getTypeIcon()}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                {node.type.replace('_', ' ')}
              </span>
              <h3 className="text-sm font-bold text-slate-100 line-clamp-1">
                {node.label}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="glass-panel p-3.5 rounded-xl space-y-1.5 border border-slate-700/60">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
            Description
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {node.description || "Core entity within enterprise transformation ontology."}
          </p>
        </div>

        {/* Key Attributes */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
            Entity Metadata
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Department</span>
              <span className="font-semibold text-slate-200">{node.department}</span>
            </div>

            <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Impact Status</span>
              <span className="font-semibold text-indigo-300 capitalize">{node.status.replace('_', ' ')}</span>
            </div>

            {node.headcount !== undefined && node.headcount !== null && (
              <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">Headcount</span>
                <span className="font-semibold text-emerald-400">{node.headcount} Staff</span>
              </div>
            )}

            {node.avg_salary !== undefined && node.avg_salary !== null && (
              <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">Avg Salary</span>
                <span className="font-semibold text-emerald-400">${(node.avg_salary / 1000).toFixed(0)}k/yr</span>
              </div>
            )}

            {node.automation_potential > 0 && (
              <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60 col-span-2">
                <span className="text-[10px] text-slate-400 block mb-1">Automation Feasibility</span>
                <div className="flex items-center justify-between">
                  <div className="w-44 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-400 to-purple-500 rounded-full" 
                      style={{ width: `${Math.round(node.automation_potential * 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-purple-300 font-bold">{Math.round(node.automation_potential * 100)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Source Citation / Traceability */}
        {node.source_citation && (
          <div className="glass-panel p-3 rounded-xl border-l-4 border-l-sky-400 text-xs space-y-1">
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block font-bold flex items-center gap-1">
              <FileText className="w-3 h-3" /> Source Provenance
            </span>
            <p className="text-[11px] text-slate-300 italic">
              "{node.source_citation}"
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
        Entity ID: {node.id} • Verified Canonical Node
      </div>
    </div>
  );
};
