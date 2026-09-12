import React, { useEffect, useState } from "react";
import { CheckCircle2, Clock, Loader2, Play, Terminal, ShieldCheck, Search, Database, Brain, Sparkles, Filter, FileText } from "lucide-react";
import { PipelineModuleLog } from "../types";

interface PipelineVisualizerProps {
  isLoading: boolean;
  activeStageIndex: number;
  moduleLogs?: PipelineModuleLog[];
}

const STAGES = [
  { id: "s1", label: "Intake & Validation", module: "API Gateway", icon: ShieldCheck, desc: "RFC validation, protocol hygiene & routing" },
  { id: "s2", label: "Crawling & Extraction", module: "Crawling Engine", icon: Search, desc: "DOM parsing, headings, images, TTFB & SSL" },
  { id: "s3", label: "Data Enrichment", module: "External Data APIs", icon: Database, desc: "Ahrefs/SEMrush metrics, DR, backlinks, visits" },
  { id: "s4", label: "Semantic & Intent", module: "AI/NLP Engine", icon: Brain, desc: "Persona profiling, intent classification & gaps" },
  { id: "s5", label: "Deterministic Audit", module: "SEO Rules Engine", icon: Filter, desc: "Tag lengths, H1 tree, alt coverage & canonicals" },
  { id: "s6", label: "Aggregation & Scoring", module: "Core Orchestrator", icon: Sparkles, desc: "Impact vs. Effort RICE ranking & sub-scores" },
  { id: "s7", label: "Output Formatting", module: "Report Generator", icon: FileText, desc: "7-section canonical deliverable & JSON payload" },
];

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({
  isLoading,
  activeStageIndex,
  moduleLogs,
}) => {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Execution Workflow Pipeline (7 Modules)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Asynchronous orchestration pipeline tracing data transformation from intake to deliverable
          </p>
        </div>

        <button
          id="toggle-pipeline-logs-btn"
          type="button"
          onClick={() => setShowLogs(!showLogs)}
          className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{showLogs ? "Hide Module Telemetry" : "Show Module Telemetry"}</span>
        </button>
      </div>

      {/* Workflow Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = !isLoading || idx < activeStageIndex;
          const isCurrent = isLoading && idx === activeStageIndex;
          const isPending = isLoading && idx > activeStageIndex;

          return (
            <div
              key={stage.id}
              className={`p-2.5 rounded-lg border transition-all text-left flex flex-col justify-between ${
                isCurrent
                  ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 ring-1 ring-blue-400/30"
                  : isDone
                  ? "bg-zinc-50/70 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800"
                  : "bg-zinc-50/30 dark:bg-zinc-900/30 border-dashed border-zinc-200 dark:border-zinc-800 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? "bg-blue-600 text-white"
                        : isDone
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-[10px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
                    {stage.module}
                  </span>
                </div>

                {isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-spin" />
                ) : isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Clock className="w-3 h-3 text-zinc-300 dark:text-zinc-700" />
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {stage.label}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5 line-clamp-2">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collapsible Telemetry / Execution Log snippet */}
      {showLogs && (
        <div className="mt-3 p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 space-y-1.5 overflow-x-auto">
          <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800 text-[11px] text-zinc-400">
            <span>Core Orchestrator Telemetry Feed</span>
            <span>Channel: /dev/events/audit-stream</span>
          </div>

          {moduleLogs && moduleLogs.length > 0 ? (
            moduleLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 py-0.5">
                <span className="text-emerald-400 shrink-0">[OK {log.latencyMs}ms]</span>
                <span className="text-zinc-400 shrink-0">{log.module}:</span>
                <span className="text-zinc-200">{log.details || `Processed ${log.recordsProcessed} units`}</span>
                <span className="text-zinc-600 ml-auto shrink-0">v={log.version}</span>
              </div>
            ))
          ) : (
            <div className="py-2 text-zinc-500 italic">
              {isLoading ? "Executing active pipeline modules in parallel..." : "Pipeline idle. Ready for audit job execution."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
