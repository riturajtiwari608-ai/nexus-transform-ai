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
    <header className="h-12 border-b border-slate-800/90 bg-[#0c1220]/98 px-4 flex items-center justify-between z-50 sticky top-0 w-full overflow-visible">
      {/* Left: Brand + Industry Dropdown with clean spacing */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-brand-600 to-indigo-500 p-0.5 flex items-center justify-center shadow">
            <div className="w-full h-full bg-[#0c1220] rounded-[4px] flex items-center justify-center">
              <Network className="w-3.5 h-3.5 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-xs font-bold text-slate-100 tracking-tight whitespace-nowrap">
            NexusTransform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
          </h1>
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-slate-800" />

        {/* Industry Selector Dropdown (Hover opens on top of everything) */}
        <div className="relative group">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 hover:border-indigo-500/60 rounded-lg px-2.5 py-1 cursor-pointer transition-all">
            <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200 truncate max-w-[150px] sm:max-w-[200px]">
              {currentIndustry ? currentIndustry.name : 'Select Industry'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-indigo-300 shrink-0" />
          </div>

          {/* Dropdown Menu - High Z-Index on top of metrics bar */}
          <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#0c1220] border border-slate-700 rounded-xl shadow-2xl backdrop-blur-xl py-1 hidden group-hover:block z-[100]">
            <div className="px-3 py-1 text-[9px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              Industry Packs
            </div>
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => onSelectIndustry(ind.id)}
                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
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

      {/* Right: Header Buttons with nice, clean distance between them */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onReset}
          title="Fit & Recenter Graph"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-slate-100 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 transition-all shadow-sm"
        >
          <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Fit Screen</span>
        </button>

        <button
          onClick={onOpenIngest}
          title="Ingest SOP / Job Description"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 transition-all shadow-sm"
        >
          <UploadCloud className="w-3.5 h-3.5 text-sky-400" />
          <span>Ingest SOP</span>
        </button>

        <button
          onClick={onOpenReskill}
          title="Shortest-Path Reskilling Optimizer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 transition-all shadow-sm"
        >
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Reskill Path</span>
        </button>

        <button
          onClick={onExportPDF}
          title="Export Executive Dossier PDF"
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/20 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export PDF</span>
        </button>
      </div>
    </header>
  );
};
