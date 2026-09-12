import React from "react";
import { Link2, TrendingUp, Users, Clock, Globe, ArrowUpRight, Shield } from "lucide-react";
import { AuditReportData } from "../types";

interface OffPageSectionProps {
  data: AuditReportData["section4_OffPage"];
}

export const OffPageSection: React.FC<OffPageSectionProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            4
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Off-Page & Analytics Interpretation
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              External Data API Module: Ahrefs / SEMrush authority metrics & SimilarWeb traffic estimates
            </p>
          </div>
        </div>
      </div>

      {/* Authority & Traffic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Backlink & Authority Profile */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-zinc-500" />
              Backlink & Authority Profile
            </span>
            <span className="text-[11px] font-mono text-zinc-400">Ahrefs / Moz Sync</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Domain Rating (DR)</span>
              <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
                {data.domainRating}
                <span className="text-xs text-zinc-400 font-normal">/100</span>
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">URL Rating (UR)</span>
              <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
                {data.urlRating}
                <span className="text-xs text-zinc-400 font-normal">/100</span>
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Dofollow Ratio</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {data.dofollowRatio}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-500">Total Backlinks</span>
              <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100">{data.backlinksCount}</span>
            </div>
            <div className="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-500">Referring Domains</span>
              <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100">{data.referringDomains}</span>
            </div>
          </div>
        </div>

        {/* Estimated Traffic & Engagement Metrics */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
              Traffic & Visitor Engagement
            </span>
            <span className="text-[11px] font-mono text-zinc-400">SimilarWeb Sync</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Monthly Visits</span>
              <span className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {data.organicMonthlyVisits}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Bounce Rate</span>
              <span className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {data.bounceRate}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Pages / Visit</span>
              <span className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {data.avgPagesPerVisit}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Avg Duration</span>
              <span className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {data.avgSessionDuration}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {data.observations.map((obs, i) => (
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
