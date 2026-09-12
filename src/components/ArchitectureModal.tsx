import React from "react";
import { X, Layers, Cpu, Server, Filter, Brain, Database, FileText, CheckCircle2, ArrowRight } from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                System Architecture & Workflow Pipeline
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Formal blueprint of components, workflow stages, and requirement mapping logic
              </p>
            </div>
          </div>
          <button
            id="close-architecture-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Components */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            1. System Architecture & Components
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-500" /> API Gateway & Load Balancer
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">Manages input request validation, RFC normalization, rate limits, and job routing.</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" /> Core Orchestrator
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">Coordinates asynchronous module task execution, tracks latency telemetry, and scores findings.</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-emerald-500" /> Crawling Engine
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">Headless browser cluster extracting DOM trees, status codes, speed/TTFB metrics, SSL, and assets.</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-500" /> SEO Rules Engine
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">Deterministic script evaluating on-page DOM elements (title lengths, H1-H6, alt coverage, canonicals).</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-purple-500" /> AI/NLP Engine
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">LLM pipeline (Gemini) analyzing intent classification, target audience profiling, and content gaps.</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-500" /> External Data API Module
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">Integrates with 3rd-party SEO databases (Ahrefs, SEMrush, SimilarWeb) for authority & traffic stats.</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-1 md:col-span-2">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-rose-500" /> Report Generator
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">Synthesizes findings, applies priority-weighting algorithms, and constructs the standardized 7-section deliverable.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Requirement Mapping Logic */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            2. Requirement Mapping Logic
          </h3>
          <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-100 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="py-2 px-3">Audit Domain</th>
                  <th className="py-2 px-3">Processing Engine / Module</th>
                  <th className="py-2 px-3">Extracted Target Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Target Audience</td><td className="py-1.5 px-3 text-purple-600">AI/NLP Engine</td><td className="py-1.5 px-3">Demographics, Pain Points, Needs</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">5 Keywords & Intent</td><td className="py-1.5 px-3 text-blue-600">External Data API + AI/NLP</td><td className="py-1.5 px-3">Volume, Difficulty 0-100, Search Intent</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Page Title & Headings</td><td className="py-1.5 px-3 text-amber-600">SEO Rules Engine</td><td className="py-1.5 px-3">DOM Parsing, Character Count, H1 Tree</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">URL Structure</td><td className="py-1.5 px-3 text-emerald-600">Crawling Engine</td><td className="py-1.5 px-3">Slug length, Hierarchy, Parameter cleanliness</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Internal Linking</td><td className="py-1.5 px-3 text-emerald-600">Crawling Engine</td><td className="py-1.5 px-3">Link count, Navigational Depth, Anchor context</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Image Optimization</td><td className="py-1.5 px-3 text-amber-600">SEO Rules Engine</td><td className="py-1.5 px-3">Alt tags coverage, WebP/SVG formats</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Technical Issues</td><td className="py-1.5 px-3 text-emerald-600">Crawling Engine</td><td className="py-1.5 px-3">HTTP status, TTFB latency, SSL cipher</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Backlinks & Analytics</td><td className="py-1.5 px-3 text-cyan-600">External Data API</td><td className="py-1.5 px-3">DR/DA, Referring domains, Organic visits</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Content Gaps</td><td className="py-1.5 px-3 text-purple-600">AI/NLP Engine</td><td className="py-1.5 px-3">Missing subtopics, User queries, Expansion</td></tr>
                <tr><td className="py-1.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">Prioritized Fixes</td><td className="py-1.5 px-3 text-indigo-600">Core Orchestrator</td><td className="py-1.5 px-3">Impact vs. Effort RICE Matrix (Top 5)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
