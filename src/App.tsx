/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Header } from "./components/Header";
import { UrlInputBar } from "./components/UrlInputBar";
import { PipelineVisualizer } from "./components/PipelineVisualizer";
import { OverviewScores } from "./components/OverviewScores";
import { AudienceAndKeywords } from "./components/AudienceAndKeywords";
import { OnPageSection } from "./components/OnPageSection";
import { TechnicalSection } from "./components/TechnicalSection";
import { OffPageSection } from "./components/OffPageSection";
import { ContentGapSection } from "./components/ContentGapSection";
import { RecommendationsTable } from "./components/RecommendationsTable";
import { ExecutionLogsViewer } from "./components/ExecutionLogsViewer";
import { MarkdownDeliverable } from "./components/MarkdownDeliverable";
import { ArchitectureModal } from "./components/ArchitectureModal";
import { AuditReportData } from "./types";
import {
  Layers,
  FileText,
  Users,
  Layout,
  Zap,
  Shield,
  HelpCircle,
  CheckSquare,
  Terminal,
  AlertCircle,
} from "lucide-react";

export default function App() {
  const [currentUrl, setCurrentUrl] = useState("https://linear.app");
  const [isLoading, setIsLoading] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [report, setReport] = useState<AuditReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "executive" | "markdown" | "audience" | "onpage" | "technical" | "offpage" | "gaps" | "recommendations" | "logs"
  >("executive");
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  const stageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const runAudit = async (targetUrl: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentUrl(targetUrl);
    setActiveStageIndex(0);

    // Simulate animated stage progression while API processes
    let currentStage = 0;
    if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);
    stageIntervalRef.current = setInterval(() => {
      currentStage++;
      if (currentStage < 6) {
        setActiveStageIndex(currentStage);
      }
    }, 450);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP error ${res.status}`);
      }

      const data: AuditReportData = await res.json();
      setActiveStageIndex(6);
      setTimeout(() => {
        setReport(data);
        setIsLoading(false);
        if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);
      }, 300);
    } catch (err: any) {
      console.error("Audit execution failed:", err);
      setError(err?.message || "Failed to complete automated audit execution.");
      setIsLoading(false);
      if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);
    }
  };

  // Run initial audit on Linear on first load so user immediately sees live data
  useEffect(() => {
    runAudit("https://linear.app");
    return () => {
      if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);
    };
  }, []);

  const navTabs = [
    { id: "executive", label: "Executive Dashboard", icon: Layers },
    { id: "markdown", label: "Standardized Deliverable (.md)", icon: FileText, highlight: true },
    { id: "audience", label: "1. Audience & Intent", icon: Users },
    { id: "onpage", label: "2. On-Page SEO", icon: Layout },
    { id: "technical", label: "3. Technical Health", icon: Zap },
    { id: "offpage", label: "4. Off-Page & Traffic", icon: Shield },
    { id: "gaps", label: "5. Content Gaps", icon: HelpCircle },
    { id: "recommendations", label: "6. Prioritized Fixes", icon: CheckSquare },
    { id: "logs", label: "7. Execution Logs", icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-zinc-100/70 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header onOpenArchitecture={() => setIsArchitectureOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Input Bar */}
        <UrlInputBar currentUrl={currentUrl} isLoading={isLoading} onAudit={runAudit} />

        {/* Pipeline Stepper */}
        <PipelineVisualizer
          isLoading={isLoading}
          activeStageIndex={activeStageIndex}
          moduleLogs={report?.section7_ExecutionLogs.processedModules}
        />

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => runAudit(currentUrl)}
              className="px-2.5 py-1 rounded bg-rose-200 dark:bg-rose-900/60 font-medium hover:bg-rose-300 transition-colors cursor-pointer"
            >
              Retry Audit
            </button>
          </div>
        )}

        {/* Results Area */}
        {report && (
          <div className="space-y-6">
            {/* Executive Synthesis Summary */}
            <OverviewScores report={report} />

            {/* Navigation Tabs */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs"
                        : tab.highlight
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Views */}
            {activeTab === "executive" && (
              <div className="space-y-6">
                <AudienceAndKeywords data={report.section1_AudienceKeywords} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <OnPageSection data={report.section2_OnPage} />
                  <TechnicalSection data={report.section3_Technical} />
                </div>
                <OffPageSection data={report.section4_OffPage} />
                <ContentGapSection data={report.section5_ContentGaps} />
                <RecommendationsTable recommendations={report.section6_PrioritizedRecommendations} />
                <ExecutionLogsViewer data={report.section7_ExecutionLogs} />
              </div>
            )}

            {activeTab === "markdown" && (
              <MarkdownDeliverable markdown={report.markdownReport} targetUrl={report.targetUrl} />
            )}

            {activeTab === "audience" && (
              <AudienceAndKeywords data={report.section1_AudienceKeywords} />
            )}

            {activeTab === "onpage" && (
              <OnPageSection data={report.section2_OnPage} />
            )}

            {activeTab === "technical" && (
              <TechnicalSection data={report.section3_Technical} />
            )}

            {activeTab === "offpage" && (
              <OffPageSection data={report.section4_OffPage} />
            )}

            {activeTab === "gaps" && (
              <ContentGapSection data={report.section5_ContentGaps} />
            )}

            {activeTab === "recommendations" && (
              <RecommendationsTable recommendations={report.section6_PrioritizedRecommendations} />
            )}

            {activeTab === "logs" && (
              <ExecutionLogsViewer data={report.section7_ExecutionLogs} />
            )}
          </div>
        )}
      </main>

      {/* Blueprint Architecture Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-4 mt-12 bg-white/50 dark:bg-zinc-950/50 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Automated SEO System Architect & Audit Engine</span>
          <span className="font-mono text-[11px]">
            API Gateway • Crawling Cluster • SEO Rules • Gemini AI/NLP • External SEO APIs • Report Generator
          </span>
        </div>
      </footer>
    </div>
  );
}
