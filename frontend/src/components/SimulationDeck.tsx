import React from 'react';
import { 
  Sliders, 
  Sparkles, 
  Lightbulb, 
  ChevronRight,
  Zap,
  Gauge
} from 'lucide-react';
import { SimulationResult } from '../types/graph';

interface SimulationDeckProps {
  adoptionRate: number;
  onAdoptionChange: (val: number) => void;
  simulation: SimulationResult | null;
}

export const SimulationDeck: React.FC<SimulationDeckProps> = ({
  adoptionRate,
  onAdoptionChange,
  simulation,
}) => {
  const presets = [
    { label: "Baseline (0%)", val: 0.0 },
    { label: "Pilot (30%)", val: 0.3 },
    { label: "Accelerated (65%)", val: 0.65 },
    { label: "Autonomous (90%)", val: 0.9 },
  ];

  return (
    <div className="w-80 h-full border-r border-slate-800/80 bg-surface/80 backdrop-blur-lg flex flex-col justify-between p-4 overflow-y-auto z-20">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Transformation Studio
              </h3>
              <p className="text-[10px] text-slate-400">What-If AI Simulation Engine</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" /> Live
          </span>
        </div>

        {/* AI Adoption Rate Slider */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">AI Adoption Velocity</span>
            <span className="font-mono text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {Math.round(adoptionRate * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={adoptionRate}
            onChange={(e) => onAdoptionChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          {/* Quick Presets */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => onAdoptionChange(p.val)}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  Math.abs(adoptionRate - p.val) < 0.04
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700/80 hover:text-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Executive Insights */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Executive Insights</span>
          </div>

          <div className="space-y-2">
            {simulation?.summary_insights.map((insight, idx) => (
              <div
                key={idx}
                className="glass-panel p-2.5 rounded-xl text-[11px] text-slate-300 leading-relaxed border-l-2 border-l-indigo-500/80 flex items-start gap-2"
              >
                <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-slate-800/80">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
          Ontology Legend
        </span>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="text-slate-300">Business Process</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Job Role</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Competency/Skill</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span className="text-slate-300">AI Agent/Tool</span>
          </div>
        </div>
      </div>
    </div>
  );
};
