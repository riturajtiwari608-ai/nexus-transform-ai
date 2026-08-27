import React, { useState, useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { GraphNode, ReskillPathway } from '../types/graph';
import { apiService } from '../services/api';

interface ReskillModalProps {
  isOpen: boolean;
  onClose: () => void;
  industryId: string;
  roles: GraphNode[];
}

export const ReskillModal: React.FC<ReskillModalProps> = ({
  isOpen,
  onClose,
  industryId,
  roles,
}) => {
  const [sourceId, setSourceId] = useState<string>('');
  const [targetId, setTargetId] = useState<string>('');
  const [pathway, setPathway] = useState<ReskillPathway | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (roles.length >= 2) {
      setSourceId(roles[0].id);
      setTargetId(roles[roles.length - 1].id);
    }
  }, [roles]);

  useEffect(() => {
    if (sourceId && targetId && isOpen) {
      fetchPathway();
    }
  }, [sourceId, targetId, isOpen, industryId]);

  const fetchPathway = async () => {
    setLoading(true);
    try {
      const res = await apiService.getReskillingPathway(industryId, sourceId, targetId);
      setPathway(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-surface border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-surfaceCard/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Shortest-Path Reskilling Optimizer
              </h2>
              <p className="text-xs text-slate-400">
                Algorithmic Career Transition Pathway & Curriculum Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selectors */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-900/60 grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Current (Displaced / At-Risk Role)
            </label>
            <select
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              className="w-full bg-surfaceCard border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} ({r.headcount || 0} employees)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Target (Future AI-Augmented Role)
            </label>
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full bg-surfaceCard border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} (${((r.avg_salary || 0)/1000).toFixed(0)}k/yr)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pathway Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Computing graph traversal & skill delta...
            </div>
          ) : pathway ? (
            <>
              {/* Metric Highlights */}
              <div className="grid grid-cols-4 gap-3">
                <div className="glass-panel p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Feasibility Score</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {pathway.transition_feasibility_score}%
                  </span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Estimated Timeline</span>
                  <span className="text-base font-bold font-mono text-sky-300">
                    {pathway.total_estimated_weeks} Weeks
                  </span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Training Cost</span>
                  <span className="text-base font-bold font-mono text-purple-300">
                    ${pathway.estimated_reskilling_cost.toLocaleString()}
                  </span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Career Upside</span>
                  <span className="text-xs font-semibold text-emerald-400 line-clamp-1 mt-1">
                    {pathway.career_growth_multiplier}
                  </span>
                </div>
              </div>

              {/* Rationale */}
              <div className="glass-panel p-3.5 rounded-xl border-l-4 border-l-emerald-500 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-emerald-400 block mb-1">Strategic Rationale:</span>
                {pathway.rationale}
              </div>

              {/* Step-by-Step Curriculum */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>3-Stage Fast-Track Reskilling Curriculum</span>
                </h4>

                <div className="space-y-2.5">
                  {pathway.steps.map((step) => (
                    <div
                      key={step.step_number}
                      className="glass-panel p-4 rounded-xl border border-slate-700/60 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {step.step_number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-bold text-slate-100">{step.skill_name}</h5>
                            <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                              {step.difficulty}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                            {step.learning_focus}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-mono font-semibold text-sky-400 block">
                          {step.estimated_weeks} Weeks
                        </span>
                        <span className="text-[10px] text-slate-500">Module Duration</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-surfaceCard/40 flex items-center justify-between text-xs text-slate-400">
          <span>Targeted reskilling saves ~70% vs external recruitment costs ($35k+).</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
