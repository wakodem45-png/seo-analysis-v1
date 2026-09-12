import React from "react";
import { Layout, CheckCircle, AlertCircle, Image as ImageIcon, Link as LinkIcon, FileCode, CheckCircle2 } from "lucide-react";
import { AuditReportData } from "../types";

interface OnPageSectionProps {
  data: AuditReportData["section2_OnPage"];
}

export const OnPageSection: React.FC<OnPageSectionProps> = ({ data }) => {
  const { titleTag, metaDescription, headingHierarchy, urlStructure, imageOptimization } = data;

  const getStatusPill = (status: "pass" | "warning" | "fail") => {
    if (status === "pass") {
      return (
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> PASS
        </span>
      );
    }
    if (status === "warning") {
      return (
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> ADVISORY
        </span>
      );
    }
    return (
      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> FAILED
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              On-Page SEO Observations
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Deterministic DOM parsing: Title, meta tags, heading cascade, URL hygiene & assets
            </p>
          </div>
        </div>
      </div>

      {/* Meta Tags & SERP Preview Card */}
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-zinc-500" />
            Meta Elements & Simulated SERP Snippet
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">Desktop Google Search Simulation</span>
        </div>

        {/* Google SERP simulation card */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-sans space-y-1">
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 truncate font-mono">
            <span>{urlStructure.url}</span>
          </div>
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
            {titleTag.content || "Missing Title Tag"}
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {metaDescription.content || "No meta description provided. Google will extract arbitrary text excerpts from the document body."}
          </p>
        </div>

        {/* Audit Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Page Title Tag</span>
              {getStatusPill(titleTag.status)}
            </div>
            <p className="text-zinc-500 font-mono text-[11px]">
              Length: {titleTag.length} characters (Recommended: 50-60)
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 text-[11px]">{titleTag.recommendation}</p>
          </div>

          <div className="p-3 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Meta Description</span>
              {getStatusPill(metaDescription.status)}
            </div>
            <p className="text-zinc-500 font-mono text-[11px]">
              Length: {metaDescription.length} characters (Recommended: 120-160)
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 text-[11px]">{metaDescription.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Heading Hierarchy Analysis */}
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-zinc-500" />
            Heading Hierarchy (H1 - H6)
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            H1: {headingHierarchy.h1Count} | H2: {headingHierarchy.h2Count} | H3: {headingHierarchy.h3Count}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          {headingHierarchy.observations.map((obs, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>

      {/* URL Structure & Image Optimization Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* URL Structure */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-zinc-500" />
              URL Structure Analysis
            </span>
            <span className="text-[11px] font-mono text-zinc-500">{urlStructure.length} chars</span>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {urlStructure.observations.map((obs, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                <span>{obs}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Optimization */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-zinc-500" />
              Image Optimization Review
            </span>
            <span className="text-[11px] font-mono text-zinc-500">{imageOptimization.totalImages} assets</span>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {imageOptimization.observations.map((obs, i) => (
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
