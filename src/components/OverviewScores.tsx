import React from "react";
import { Gauge, CheckCircle, AlertTriangle, ArrowUpRight, ShieldCheck, Sparkles, Database } from "lucide-react";
import { AuditReportData } from "../types";

interface OverviewScoresProps {
  report: AuditReportData;
}

export const OverviewScores: React.FC<OverviewScoresProps> = ({ report }) => {
  const { overallScore, scores, targetUrl, auditedAt, section4_OffPage } = report;

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { label: "Optimal Architecture", bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800" };
    if (score >= 70) return { label: "Competitive Baseline", bg: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800" };
    return { label: "Attention Required", bg: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800" };
  };

  const badge = getScoreBadge(overallScore);

  const pillars = [
    { label: "On-Page SEO", score: scores.onPage, weight: "35% weight", desc: "Title, H1-H6 structure, meta tags & image alt hygiene" },
    { label: "Technical Health", score: scores.technical, weight: "25% weight", desc: "TTFB latency, SSL cipher, robots & canonical tags" },
    { label: "Content & Intent", score: scores.content, weight: "25% weight", desc: "Semantic relevance, user persona alignment & topical depth" },
    { label: "Off-Page Authority", score: scores.offPage, weight: "15% weight", desc: "Estimated Domain Rating, backlink volume & organic traffic" },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Audit Executive Synthesis
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
              {badge.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex-wrap font-mono">
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">{targetUrl}</span>
            <span>•</span>
            <span>Audited: {new Date(auditedAt).toLocaleString()}</span>
            <span>•</span>
            <span>Job: {report.section7_ExecutionLogs.jobId.slice(0, 16)}...</span>
          </div>
        </div>

        {/* Quick Highlights Chips */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
            <span className="text-zinc-400">DR:</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{section4_OffPage.domainRating}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
            <span className="text-zinc-400">Visits/mo:</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{section4_OffPage.organicMonthlyVisits}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
            <span className="text-zinc-400">TTFB:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{report.section3_Technical.performance.ttfbMs}ms</span>
          </div>
        </div>
      </div>

      {/* Primary Score Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Overall Score Dial */}
        <div className="md:col-span-1 flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
            Overall Health
          </span>
          <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-baseline">
            {overallScore}
            <span className="text-base text-zinc-400 dark:text-zinc-500 font-normal">/100</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                overallScore >= 80 ? "bg-emerald-500" : overallScore >= 65 ? "bg-blue-500" : "bg-amber-500"
              }`}
              style={{ width: `${overallScore}%` }}
            />
          </div>
        </div>

        {/* 4 Pillars Breakdown */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {pillar.label}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {pillar.weight}
                  </span>
                </div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {pillar.score}
                  <span className="text-xs text-zinc-400 font-normal">/100</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full"
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
