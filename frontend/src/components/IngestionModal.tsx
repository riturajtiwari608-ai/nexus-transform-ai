import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { IngestResult } from '../types/graph';
import { apiService } from '../services/api';

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngestSuccess: (result: IngestResult) => void;
}

export const IngestionModal: React.FC<IngestionModalProps> = ({
  isOpen,
  onClose,
  onIngestSuccess,
}) => {
  const [docName, setDocName] = useState('SOP-Enterprise-Loan-Audit');
  const [docType, setDocType] = useState('SOP');
  const [department, setDepartment] = useState('Finance & Lending');
  const [content, setContent] = useState(
`Standard Operating Procedure: Commercial Loan Underwriting & Risk Audit
1. Intake & Document Extraction: The Loan Analyst parses borrower financial statements and tax declarations.
2. Compliance Rule Evaluation: The Risk Officer checks credit scores against regulatory liquidity thresholds.
3. Collateral Appraisal Verification: The Senior Appraiser assesses commercial property valuations.
4. Required Competencies: Financial Statement Analysis, Regulatory Banking Compliance, Prompt Auditing.
`
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIngest = async () => {
    if (!content.trim()) {
      setError("Please provide document text.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.ingestDocument(docName, docType, content, department);
      onIngestSuccess(res);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to ingest document.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-surfaceCard/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Enterprise SOP & JD Ingestion Agent
              </h2>
              <p className="text-xs text-slate-400">
                Autonomous Extraction of Processes, Roles, Skills & AI Interventions
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

        {/* Inputs */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Document Name
              </label>
              <input
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full bg-surfaceCard border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Format
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-surfaceCard border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="SOP">SOP (Standard Operating Proc)</option>
                <option value="Job_Description">Job Description (JD)</option>
                <option value="BPMN_Text">BPMN Workflow Description</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-surfaceCard border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Raw Unstructured Text Content
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste SOP manual clauses, job requirements, or procedure steps here..."
              className="w-full bg-surfaceCard border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-surfaceCard/40 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Runs LLM entity extraction & schema-free graph linking
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleIngest}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/20 disabled:opacity-50 transition-all"
            >
              {loading ? "Extracting & Graphing..." : "Parse & Add to Graph"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
