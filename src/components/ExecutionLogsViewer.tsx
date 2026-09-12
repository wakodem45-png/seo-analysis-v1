import React, { useState } from "react";
import { Terminal, Copy, Check, Server, Clock, Cpu, ShieldAlert } from "lucide-react";
import { AuditReportData } from "../types";

interface ExecutionLogsViewerProps {
  data: AuditReportData["section7_ExecutionLogs"];
}

export const ExecutionLogsViewer: React.FC<ExecutionLogsViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            7
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Automated System Execution Logs
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Diagnostic JSON payload: Execution status, module latency timings, records processed & gateway telemetry
            </p>
          </div>
        </div>

        <button
          id="copy-json-logs-btn"
          onClick={handleCopy}
          className="text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Copied JSON</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy JSON Payload</span>
            </>
          )}
        </button>
      </div>

      {/* Cluster Meta Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Job ID</span>
          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 truncate block">
            {data.jobId}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Status</span>
          <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            {data.executionStatus}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Duration</span>
          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
            {data.totalDurationMs} ms
          </span>
        </div>
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Worker Node</span>
          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 truncate block">
            {data.gatewayInfo?.workerNode || "worker-cluster-us-central1-b"}
          </span>
        </div>
      </div>

      {/* JSON Display Box */}
      <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
        <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-zinc-500" />
            <span>payload.execution.json</span>
          </div>
          <span>Schema: RFC-7946 AuditPayload</span>
        </div>
        <pre className="p-4 text-xs font-mono text-emerald-400/90 overflow-x-auto max-h-[360px] leading-relaxed">
          {jsonString}
        </pre>
      </div>
    </div>
  );
};
