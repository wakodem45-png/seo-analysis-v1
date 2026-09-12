import React from "react";
import { Zap, ShieldCheck, Network, Lock, CheckCircle2, AlertTriangle, ArrowRightLeft } from "lucide-react";
import { AuditReportData } from "../types";

interface TechnicalSectionProps {
  data: AuditReportData["section3_Technical"];
}

export const TechnicalSection: React.FC<TechnicalSectionProps> = ({ data }) => {
  const { performance, crawlability, internalLinking } = data;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Technical SEO Observations
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Crawling Engine telemetry: Response latency, indexability barriers, SSL & link topology
            </p>
          </div>
        </div>
      </div>

      {/* 3 Technical Sub-Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Page Performance */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-zinc-500" />
              Page Performance
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {performance.httpStatus} OK
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">TTFB</span>
              <span className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {performance.ttfbMs} ms
              </span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Latency</span>
              <span className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {performance.responseTimeMs} ms
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {performance.observations.map((obs, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                <span>{obs}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Crawlability & SSL */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
              Crawlability & SSL
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> TLS Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Indexability</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {crawlability.indexable ? "Allowed" : "Blocked"}
              </span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Canonical Tag</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {crawlability.canonicalPresent ? "Present" : "Missing"}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {crawlability.observations.map((obs, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                <span>{obs}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Linking Structure */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-zinc-500" />
              Internal Linking Structure
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              ~{internalLinking.avgLinkDepth} Clicks
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Internal Links</span>
              <span className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {internalLinking.totalInternalLinks}
              </span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">External Outbound</span>
              <span className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {internalLinking.externalLinks}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {internalLinking.observations.map((obs, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                <span>{obs}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
