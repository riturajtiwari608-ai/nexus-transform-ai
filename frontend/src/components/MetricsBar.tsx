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
    <div className="grid grid-cols-5 gap-3.5 px-6 py-3 bg-surface/60 border-b border-slate-800/80 backdrop-blur-md">
      {/* 1. Net Projected Cost Savings */}
      <div className="glass-panel p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Net Annual Savings</span>
          </div>
          <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
            ${(costSavings).toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-500/90 font-medium flex items-center gap-0.5">
            <ArrowUpRight className="w-2.5 h-2.5" /> +{savingsPct}% operational ROI
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {/* 2. Enterprise Automation Index */}
      <div className="glass-panel p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Automation Index</span>
          </div>
          <div className="text-lg font-bold font-mono text-purple-300 mt-0.5">
            {simulation.automation_index}%
          </div>
          <div className="text-[10px] text-purple-400/90 font-medium">
            Across active workflows
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* 3. Augmented vs Displaced Workforce */}
      <div className="glass-panel p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>Augmented Capacity</span>
          </div>
          <div className="text-lg font-bold font-mono text-sky-300 mt-0.5">
            {simulation.augmented_headcount} <span className="text-xs text-slate-400 font-normal">roles</span>
          </div>
          <div className="text-[10px] text-rose-400 font-medium">
            {simulation.displaced_headcount} roles queued for reskilling
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
          <Users className="w-4 h-4" />
        </div>
      </div>

      {/* 4. Annual Hours Reclaimed */}
      <div className="glass-panel p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Reclaimed Capacity</span>
          </div>
          <div className="text-lg font-bold font-mono text-indigo-300 mt-0.5">
            {Math.round(simulation.time_saved_hours_annual).toLocaleString()} <span className="text-xs text-slate-400 font-normal">hrs</span>
          </div>
          <div className="text-[10px] text-indigo-400/90 font-medium">
            Shifted to high-judgment tasks
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* 5. Human-in-the-Loop Safety Score */}
      <div className="glass-panel p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>HITL Safety Score</span>
          </div>
          <div className="text-lg font-bold font-mono text-amber-300 mt-0.5">
            {simulation.human_in_loop_safety_score}%
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">
            Audit-ready governance
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
