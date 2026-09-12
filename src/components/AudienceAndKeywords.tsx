import React from "react";
import { Users, Target, Search, Compass, ShoppingCart, Info, BarChart3 } from "lucide-react";
import { AuditReportData, SearchIntent } from "../types";

interface AudienceAndKeywordsProps {
  data: AuditReportData["section1_AudienceKeywords"];
}

const getIntentBadge = (intent: SearchIntent) => {
  switch (intent) {
    case "Transactional":
      return { label: "Transactional", bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800" };
    case "Commercial":
      return { label: "Commercial", bg: "bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300 dark:border-purple-800" };
    case "Navigational":
      return { label: "Navigational", bg: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700" };
    case "Informational":
    default:
      return { label: "Informational", bg: "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800" };
  }
};

const getDifficultyColor = (diff: number) => {
  if (diff < 35) return "text-emerald-600 dark:text-emerald-400";
  if (diff < 65) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
};

export const AudienceAndKeywords: React.FC<AudienceAndKeywordsProps> = ({ data }) => {
  const { audienceProfile, painPoints, coreNeeds, keywords } = data;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Target Audience & Search Intent Profile
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              AI/NLP Engine persona classification & 3rd-party keyword landscape
            </p>
          </div>
        </div>
      </div>

      {/* Audience Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            Demographics & Archetype
          </div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {audienceProfile.demographics}
          </p>

          <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
              Primary Intent Horizon:
            </span>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              {audienceProfile.intent}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-zinc-500" />
            User Search & Acquisition Goals
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
            {audienceProfile.userGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pain Points & Core Needs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
          <span className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            Key User Pain Points
          </span>
          <ul className="space-y-1 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
            {painPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
          <span className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
            Core Operational Needs
          </span>
          <ul className="space-y-1 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
            {coreNeeds.map((need, i) => (
              <li key={i}>{need}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Keyword Research Table */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            Top 5 Relevant Keywords & Search Intent Matrix
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">
            External Data API + NLP Intent Engine
          </span>
        </div>

        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800 font-medium">
                <th className="py-2.5 px-4">Keyword</th>
                <th className="py-2.5 px-4">Search Volume</th>
                <th className="py-2.5 px-4">Keyword Difficulty</th>
                <th className="py-2.5 px-4">Likely Search Intent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono">
              {keywords.map((kw, i) => {
                const intentBadge = getIntentBadge(kw.intent);
                return (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                      {kw.keyword}
                    </td>
                    <td className="py-2.5 px-4 text-zinc-600 dark:text-zinc-400">
                      {kw.searchVolume}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getDifficultyColor(kw.difficulty)}`}>
                          {kw.difficulty}/100
                        </span>
                        <div className="w-16 bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              kw.difficulty < 35
                                ? "bg-emerald-500"
                                : kw.difficulty < 65
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${kw.difficulty}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`inline-block text-[11px] font-sans font-medium px-2 py-0.5 rounded-full border ${intentBadge.bg}`}>
                        {intentBadge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
