import React from 'react';
import { 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Clock
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
    <div className="grid grid-cols-5 gap-1 px-2 py-0.5 bg-[#090d16]/95 border-b border-slate-800/80 backdrop-blur-md w-full max-w-full overflow-hidden">
      {/* 1. Net Projected Cost Savings */}
      <div className="glass-panel px-1.5 py-0.5 rounded-md border border-slate-700/50 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-0.5 text-slate-400 text-[8px] font-medium truncate">
          <DollarSign className="w-2 h-2 text-emerald-400 shrink-0" />
          <span className="truncate">Net Savings</span>
        </div>
        <div className="text-[11px] font-bold font-mono text-emerald-400 leading-none my-0.5 truncate">
          ${(costSavings).toLocaleString()}
        </div>
        <div className="text-[7.5px] text-emerald-400/90 font-medium truncate leading-none">
          +{savingsPct}% ROI
        </div>
      </div>

      {/* 2. Enterprise Automation Index */}
      <div className="glass-panel px-1.5 py-0.5 rounded-md border border-slate-700/50 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-0.5 text-slate-400 text-[8px] font-medium truncate">
          <Sparkles className="w-2 h-2 text-purple-400 shrink-0" />
          <span className="truncate">Automation Index</span>
        </div>
        <div className="text-[11px] font-bold font-mono text-purple-300 leading-none my-0.5 truncate">
          {simulation.automation_index}%
        </div>
        <div className="text-[7.5px] text-purple-400/90 font-medium truncate leading-none">
          Workflows
        </div>
      </div>

      {/* 3. Augmented vs Displaced Workforce */}
      <div className="glass-panel px-1.5 py-0.5 rounded-md border border-slate-700/50 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-0.5 text-slate-400 text-[8px] font-medium truncate">
          <Users className="w-2 h-2 text-sky-400 shrink-0" />
          <span className="truncate">Augmented Cap</span>
        </div>
        <div className="text-[11px] font-bold font-mono text-sky-300 leading-none my-0.5 truncate">
          {simulation.augmented_headcount} <span className="text-[8px] text-slate-400 font-normal">roles</span>
        </div>
        <div className="text-[7.5px] text-rose-400/90 font-medium truncate leading-none">
          {simulation.displaced_headcount} in reskill
        </div>
      </div>

      {/* 4. Annual Hours Reclaimed */}
      <div className="glass-panel px-1.5 py-0.5 rounded-md border border-slate-700/50 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-0.5 text-slate-400 text-[8px] font-medium truncate">
          <Clock className="w-2 h-2 text-indigo-400 shrink-0" />
          <span className="truncate">Reclaimed Time</span>
        </div>
        <div className="text-[11px] font-bold font-mono text-indigo-300 leading-none my-0.5 truncate">
          {Math.round(simulation.time_saved_hours_annual).toLocaleString()} <span className="text-[8px] text-slate-400 font-normal">hrs</span>
        </div>
        <div className="text-[7.5px] text-indigo-400/90 font-medium truncate leading-none">
          High-value
        </div>
      </div>

      {/* 5. Human-in-the-Loop Safety Score */}
      <div className="glass-panel px-1.5 py-0.5 rounded-md border border-slate-700/50 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-0.5 text-slate-400 text-[8px] font-medium truncate">
          <ShieldCheck className="w-2 h-2 text-amber-400 shrink-0" />
          <span className="truncate">HITL Safety Score</span>
        </div>
        <div className="text-[11px] font-bold font-mono text-amber-300 leading-none my-0.5 truncate">
          {simulation.human_in_loop_safety_score}%
        </div>
        <div className="text-[7.5px] text-emerald-400/90 font-medium truncate leading-none">
          Audit-ready
        </div>
      </div>
    </div>
  );
};
