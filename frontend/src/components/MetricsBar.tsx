import React from 'react';
import { 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { SimulationResult } from '../types/graph';

interface MetricsBarProps {
  simulation: SimulationResult | null;
  baselineCost: number;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ simulation, baselineCost }) => {
  if (!simulation) return null;

  const costSavings = simulation.projected_cost_savings;
  const savingsPct = baselineCost > 0 ? Math.round((costSavings / baselineCost) * 100) : 18;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 px-4 py-2 bg-surface/70 border-b border-slate-800/80 backdrop-blur-md">
      {/* 1. Net Projected Cost Savings */}
      <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium truncate">
            <DollarSign className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Net Annual Savings</span>
          </div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
            ${(costSavings).toLocaleString()}
          </div>
          <div className="text-[9px] text-emerald-400 font-medium flex items-center gap-0.5 truncate">
            <ArrowUpRight className="w-2.5 h-2.5 shrink-0" /> +{savingsPct}% ROI
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
          <TrendingUp className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 2. Enterprise Automation Index */}
      <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium truncate">
            <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
            <span className="truncate">Automation Index</span>
          </div>
          <div className="text-base font-bold font-mono text-purple-300 mt-0.5">
            {simulation.automation_index}%
          </div>
          <div className="text-[9px] text-purple-400 font-medium truncate">
            Across workflows
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 3. Augmented vs Displaced Workforce */}
      <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium truncate">
            <Users className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="truncate">Augmented Capacity</span>
          </div>
          <div className="text-base font-bold font-mono text-sky-300 mt-0.5">
            {simulation.augmented_headcount} <span className="text-[10px] text-slate-400 font-normal">roles</span>
          </div>
          <div className="text-[9px] text-rose-400 font-medium truncate">
            {simulation.displaced_headcount} in reskilling
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
          <Users className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 4. Annual Hours Reclaimed */}
      <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium truncate">
            <Clock className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="truncate">Reclaimed Time</span>
          </div>
          <div className="text-base font-bold font-mono text-indigo-300 mt-0.5">
            {Math.round(simulation.time_saved_hours_annual).toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">hrs</span>
          </div>
          <div className="text-[9px] text-indigo-400 font-medium truncate">
            High-value tasks
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
          <Clock className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 5. Human-in-the-Loop Safety Score */}
      <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium truncate">
            <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">HITL Safety Score</span>
          </div>
          <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
            {simulation.human_in_loop_safety_score}%
          </div>
          <div className="text-[9px] text-emerald-400 font-medium truncate">
            Audit-ready
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
