import React from 'react';
import { 
  Network, 
  UploadCloud, 
  GraduationCap, 
  Download, 
  ChevronDown, 
  Layers, 
  Maximize2
} from 'lucide-react';
import { IndustryMeta } from '../types/graph';

interface NavbarProps {
  industries: IndustryMeta[];
  selectedIndustry: string;
  onSelectIndustry: (id: string) => void;
  onOpenIngest: () => void;
  onOpenReskill: () => void;
  onExportPDF: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  industries,
  selectedIndustry,
  onSelectIndustry,
  onOpenIngest,
  onOpenReskill,
  onExportPDF,
  onReset,
}) => {
  const currentIndustry = industries.find(i => i.id === selectedIndustry) || industries[0];

  return (
    <header className="h-13 border-b border-slate-800/80 bg-surface/95 backdrop-blur-md px-3 py-1.5 flex items-center justify-between z-30 sticky top-0 w-full overflow-hidden">
      {/* Left: Brand + Domain Dropdown tightly grouped together */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 p-0.5 shadow flex items-center justify-center">
            <div className="w-full h-full bg-surface rounded-[5px] flex items-center justify-center">
              <Network className="w-3.5 h-3.5 text-indigo-400" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xs font-bold text-slate-100 tracking-tight whitespace-nowrap">
              NexusTransform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
            </h1>
            <span className="px-1 py-0.2 rounded text-[8px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              v2.0
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-4 w-px bg-slate-800" />

        {/* Industry Selector Dropdown (Compact) */}
        <div className="relative group">
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 hover:border-indigo-500/60 rounded-md px-2 py-1 cursor-pointer transition-all">
            <Layers className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="text-[11px] font-medium text-slate-200 truncate max-w-[130px] sm:max-w-[170px]">
              {currentIndustry ? currentIndustry.name : 'Select Industry'}
            </span>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-300 shrink-0" />
          </div>

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 w-64 bg-surface/95 border border-slate-700 rounded-lg shadow-2xl backdrop-blur-xl py-1 hidden group-hover:block z-50">
            <div className="px-2.5 py-1 text-[9px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              Industry Packs
            </div>
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => onSelectIndustry(ind.id)}
                className={`w-full px-2.5 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                  ind.id === selectedIndustry ? 'text-indigo-400 font-semibold bg-indigo-500/10' : 'text-slate-300'
                }`}
              >
                <span className="truncate pr-2">{ind.name}</span>
                <span className="text-[9px] font-mono text-slate-500 shrink-0">{ind.node_count} nodes</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Actions Tightly Grouped */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onReset}
          title="Fit & Recenter Graph"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-300 hover:text-slate-100 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all"
        >
          <Maximize2 className="w-3 h-3 text-indigo-400" />
          <span>Fit Screen</span>
        </button>

        <button
          onClick={onOpenIngest}
          title="Ingest SOP / Job Description"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all"
        >
          <UploadCloud className="w-3 h-3 text-sky-400" />
          <span>Ingest SOP</span>
        </button>

        <button
          onClick={onOpenReskill}
          title="Shortest-Path Reskilling Optimizer"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 transition-all shadow-sm"
        >
          <GraduationCap className="w-3 h-3 text-emerald-400" />
          <span>Reskill Path</span>
        </button>

        <button
          onClick={onExportPDF}
          title="Export Executive Dossier PDF"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-gradient-to-r from-indigo-600 via-brand-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow transition-all"
        >
          <Download className="w-3 h-3" />
          <span>Export PDF</span>
        </button>
      </div>
    </header>
  );
};
