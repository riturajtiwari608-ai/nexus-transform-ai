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
    <div className="w-72 h-full border-r border-slate-800/80 bg-surface/90 backdrop-blur-lg flex flex-col justify-between p-3.5 overflow-y-auto z-20 shrink-0">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Transformation Studio
              </h3>
              <p className="text-[9px] text-slate-400">What-If AI Simulation Engine</p>
            </div>
          </div>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-0.5">
            <Zap className="w-2 h-2" /> Live
          </span>
        </div>

        {/* AI Adoption Rate Slider */}
        <div className="glass-panel p-3 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300 text-[11px]">AI Adoption Velocity</span>
            <span className="font-mono text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
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
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />

          {/* Presets */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {presets.map((p) => {
              const isActive = Math.abs(adoptionRate - p.val) < 0.04;
              return (
                <button
                  key={p.label}
                  onClick={() => onAdoptionChange(p.val)}
                  className={`py-1 px-1.5 rounded-lg text-[10px] font-medium border transition-all ${
                    isActive
                      ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200 font-semibold shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-Time Transformation Insights */}
        {simulation && simulation.summary_insights.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 text-[11px] font-semibold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Executive Insights</span>
            </div>

            <div className="space-y-1.5">
              {simulation.summary_insights.map((insight, idx) => (
                <div 
                  key={idx}
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[10px] text-slate-300 leading-relaxed flex items-start gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer System Status */}
      <div className="pt-3 border-t border-slate-800/80 text-[9px] font-mono text-slate-500 flex items-center justify-between">
        <span>ONTOLOGY: LOADED</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          ONLINE
        </span>
      </div>
    </div>
  );
};
