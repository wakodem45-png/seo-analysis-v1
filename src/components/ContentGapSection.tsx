import React from "react";
import { HelpCircle, AlertCircle, Sparkles, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { AuditReportData } from "../types";

interface ContentGapSectionProps {
  data: AuditReportData["section5_ContentGaps"];
}

export const ContentGapSection: React.FC<ContentGapSectionProps> = ({ data }) => {
  const { missingSubtopics, unansweredUserQueries, depthOpportunities, topicalCoverageScore } = data;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            5
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Content Gap Analysis
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              AI/NLP Engine: Semantic gap detection, searcher query coverage & topical authority expansion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">Topical Coverage:</span>
          <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
            {topicalCoverageScore}/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Missing Subtopics */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            Missing Subtopics
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Critical topical clusters present in category search demand but absent from audited canvas:
          </p>

          <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
            {missingSubtopics.map((sub, i) => (
              <li key={i} className="flex items-start gap-2 p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span className="font-medium">{sub}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Unanswered User Queries */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
            Unanswered User Queries
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            High-friction questions asked by prospective evaluators during decision journeys:
          </p>

          <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
            {unansweredUserQueries.map((query, i) => (
              <li key={i} className="flex items-start gap-2 p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{query}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Depth Opportunities */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            Depth & Expansion Moves
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            High-leverage asset expansion to capture informational & commercial intent queries:
          </p>

          <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
            {depthOpportunities.map((opp, i) => (
              <li key={i} className="flex items-start gap-2 p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
