import React from "react";
import { CheckSquare, ArrowUpRight, Flame, Zap, Clock, ShieldCheck } from "lucide-react";
import { RecommendationItem } from "../types";

interface RecommendationsTableProps {
  recommendations: RecommendationItem[];
}

const getImpactBadge = (impact: "High" | "Medium" | "Low") => {
  switch (impact) {
    case "High":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800";
    case "Medium":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800";
    case "Low":
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700";
  }
};

const getEffortBadge = (effort: "High" | "Medium" | "Low") => {
  switch (effort) {
    case "Low":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    case "Medium":
      return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    case "High":
    default:
      return "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800";
  }
};

const getCategoryBadge = (cat: string) => {
  switch (cat) {
    case "On-Page":
      return "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300";
    case "Technical":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300";
    case "Content":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
    case "Off-Page":
    default:
      return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300";
  }
};

export const RecommendationsTable: React.FC<RecommendationsTableProps> = ({ recommendations }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            6
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Prioritized Recommendations (Top 5)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Core Orchestrator: Impact vs. Effort matrix algorithm ranking engineering & content fixes
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
          Matrix Model: RICE / Impact vs Effort
        </span>
      </div>

      {/* Structured Table */}
      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800 font-medium">
              <th className="py-2.5 px-3 text-center w-12">Rank</th>
              <th className="py-2.5 px-4 min-w-[280px]">Fix Description & Rationale</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3 text-center">Impact</th>
              <th className="py-2.5 px-3 text-center">Effort</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
            {recommendations.map((rec) => (
              <tr key={rec.rank} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="py-3 px-3 text-center font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 inline-flex items-center justify-center text-xs">
                    {rec.rank}
                  </span>
                </td>
                <td className="py-3 px-4 space-y-1">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs">
                    {rec.fixDescription}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Rationale: </span>
                    {rec.rationale}
                  </p>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${getCategoryBadge(rec.category)}`}>
                    {rec.category}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded border ${getImpactBadge(rec.impact)}`}>
                    {rec.impact}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded border ${getEffortBadge(rec.effort)}`}>
                    {rec.effort}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
