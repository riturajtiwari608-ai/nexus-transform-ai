import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { 
  Building2, 
  User, 
  Sparkles, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { GraphNode } from '../types/graph';

export const ProcessNode = memo(({ data }: NodeProps<GraphNode>) => {
  const isAutomated = data.status === 'automated';
  const isAugmented = data.status === 'augmented';

  return (
    <div className={`w-72 rounded-xl glass-panel p-4 shadow-xl transition-all duration-300 border-l-4 ${
      isAutomated 
        ? 'border-l-purple-500 shadow-purple-950/40 border-purple-500/50' 
        : isAugmented 
          ? 'border-l-blue-500 shadow-blue-950/40 border-blue-500/50' 
          : 'border-l-sky-400 border-slate-700/60'
    } hover:scale-[1.02] cursor-pointer group`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-sky-400 border-2 border-slate-900" />
      
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
            Process
          </span>
        </div>

        {isAutomated ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 animate-pulse">
            <Sparkles className="w-2.5 h-2.5" /> Automated
          </span>
        ) : isAugmented ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
            <TrendingUp className="w-2.5 h-2.5" /> Augmented
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
            Baseline
          </span>
        )}
      </div>

      <h4 className="text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-1">
        {data.label}
      </h4>
      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
        {data.description}
      </p>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Automation Potential:</span>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-purple-500 rounded-full"
              style={{ width: `${Math.round((data.automation_potential || 0) * 100)}%` }}
            />
          </div>
          <span className="font-mono text-sky-300 font-semibold">
            {Math.round((data.automation_potential || 0) * 100)}%
          </span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-sky-400 border-2 border-slate-900" />
    </div>
  );
});

export const RoleNode = memo(({ data }: NodeProps<GraphNode>) => {
  const isAtRisk = data.status === 'at_risk';
  const isNew = data.status === 'new_opportunity';
  const isAugmented = data.status === 'augmented';

  return (
    <div className={`w-72 rounded-xl glass-panel p-4 shadow-xl transition-all duration-300 border-l-4 ${
      isNew 
        ? 'border-l-purple-400 shadow-purple-950/50 border-purple-500/50' 
        : isAtRisk 
          ? 'border-l-rose-500 shadow-rose-950/40 border-rose-500/50' 
          : 'border-l-emerald-400 shadow-emerald-950/30 border-slate-700/60'
    } hover:scale-[1.02] cursor-pointer group`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-emerald-400 border-2 border-slate-900" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <User className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            Role
          </span>
        </div>

        {isNew ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-purple-400" /> New Co-Pilot
          </span>
        ) : isAtRisk ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5 text-rose-400" /> Reskill Priority
          </span>
        ) : isAugmented ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Augmented
          </span>
        ) : null}
      </div>

      <h4 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
        {data.label}
      </h4>
      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
        {data.description}
      </p>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-slate-500 text-[10px] block">Headcount</span>
          <span className="font-mono text-slate-200 font-semibold">{data.headcount || 0} employees</span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 text-[10px] block">Avg Salary</span>
          <span className="font-mono text-emerald-400 font-semibold">${((data.avg_salary || 0) / 1000).toFixed(0)}k/yr</span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-400 border-2 border-slate-900" />
    </div>
  );
});

export const SkillNode = memo(({ data }: NodeProps<GraphNode>) => {
  return (
    <div className="w-64 rounded-xl glass-panel p-3.5 shadow-xl transition-all duration-300 border-l-4 border-l-amber-400 border-slate-700/60 hover:scale-[1.02] cursor-pointer group">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-amber-400 border-2 border-slate-900" />

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
            Competency
          </span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
          {data.complexity || 'Medium'}
        </span>
      </div>

      <h4 className="text-xs font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
        {data.label}
      </h4>
      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
        {data.description}
      </p>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-amber-400 border-2 border-slate-900" />
    </div>
  );
});

export const AIAgentNode = memo(({ data }: NodeProps<GraphNode>) => {
  return (
    <div className="w-72 rounded-xl glass-panel p-4 shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500 border-purple-500/40 shadow-purple-950/60 hover:scale-[1.02] cursor-pointer group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-400 border-2 border-slate-900" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
            <Bot className="w-4 h-4 text-purple-300" />
          </div>
          <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider font-bold">
            Autonomous Agent
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-purple-500/30 to-indigo-500/30 text-purple-200 border border-purple-400/40 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-purple-300" /> AI Intervener
        </span>
      </div>

      <h4 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1">
        {data.label}
      </h4>
      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
        {data.description}
      </p>

      <div className="mt-3 pt-2.5 border-t border-purple-900/40 flex items-center justify-between text-[11px]">
        <span className="text-purple-300/80">Autonomous Efficiency:</span>
        <span className="font-mono text-purple-300 font-bold">
          {Math.round((data.automation_potential || 0.85) * 100)}% Throughput
        </span>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-400 border-2 border-slate-900" />
    </div>
  );
});

export const nodeTypes = {
  process: ProcessNode,
  role: RoleNode,
  skill: SkillNode,
  ai_agent: AIAgentNode,
};
