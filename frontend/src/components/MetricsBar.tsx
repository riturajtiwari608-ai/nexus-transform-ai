import React from 'react';
import { 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowUpRight
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
    <div className="grid grid-cols-5 gap-1 px-2 py-0.5 bg-[#090d16]/95 border-b border-slate-800/80 backdrop-blur-md w-full overflow-hidden">
      {/* 1. Net Projected Cost Savings */}
      <div className="glass-panel min-h-10 px-2 py-0.5 rounded-md border border-slate-700/60 flex items-center justify-between min-w-0">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-medium truncate">
            <DollarSign className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="truncate">Net Savings</span>
          </div>
          <div className="text-xs sm:text-sm font-bold font-mono text-emerald-400 leading-tight">
            ${(costSavings).toLocaleString()}
          </div>
          <div className="text-[8px] text-emerald-400 font-medium truncate">
            +{savingsPct}% ROI
          </div>
        </div>
      </div>

      {/* 2. Enterprise Automation Index */}
      <div className="glass-panel min-h-10 px-2 py-0.5 rounded-md border border-slate-700/60 flex items-center justify-between min-w-0">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-medium truncate">
            <Sparkles className="w-2.5 h-2.5 text-purple-400 shrink-0" />
            <span className="truncate">Automation Index</span>
          </div>
          <div className="text-xs sm:text-sm font-bold font-mono text-purple-300 leading-tight">
            {simulation.automation_index}%
          </div>
          <div className="text-[8px] text-purple-400 font-medium truncate">
            Active workflows
          </div>
        </div>
      </div>

      {/* 3. Augmented vs Displaced Workforce */}
      <div className="glass-panel min-h-10 px-2 py-0.5 rounded-md border border-slate-700/60 flex items-center justify-between min-w-0">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-medium truncate">
            <Users className="w-2.5 h-2.5 text-sky-400 shrink-0" />
            <span className="truncate">Augmented Capacity</span>
          </div>
          <div className="text-xs sm:text-sm font-bold font-mono text-sky-300 leading-tight">
            {simulation.augmented_headcount} <span className="text-[9px] text-slate-400 font-normal">roles</span>
          </div>
          <div className="text-[8px] text-rose-400 font-medium truncate">
            {simulation.displaced_headcount} in reskilling
          </div>
        </div>
      </div>

      {/* 4. Annual Hours Reclaimed */}
      <div className="glass-panel min-h-10 px-2 py-0.5 rounded-md border border-slate-700/60 flex items-center justify-between min-w-0">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-medium truncate">
            <Clock className="w-2.5 h-2.5 text-indigo-400 shrink-0" />
            <span className="truncate">Reclaimed Time</span>
          </div>
          <div className="text-xs sm:text-sm font-bold font-mono text-indigo-300 leading-tight">
            {Math.round(simulation.time_saved_hours_annual).toLocaleString()} <span className="text-[9px] text-slate-400 font-normal">hrs</span>
          </div>
          <div className="text-[8px] text-indigo-400 font-medium truncate">
            High-value tasks
          </div>
        </div>
      </div>

      {/* 5. Human-in-the-Loop Safety Score */}
      <div className="glass-panel min-h-10 px-2 py-0.5 rounded-md border border-slate-700/60 flex items-center justify-between min-w-0">
        <div className="truncate">
          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-medium truncate">
            <ShieldCheck className="w-2.5 h-2.5 text-amber-400 shrink-0" />
            <span className="truncate">HITL Safety Score</span>
          </div>
          <div className="text-xs sm:text-sm font-bold font-mono text-amber-300 leading-tight">
            {simulation.human_in_loop_safety_score}%
          </div>
          <div className="text-[8px] text-emerald-400 font-medium truncate">
            Audit-ready
          </div>
        </div>
      </div>
    </div>
  );
};
