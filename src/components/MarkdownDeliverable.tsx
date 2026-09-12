import React, { useState } from "react";
import { Copy, Check, Download, FileText, Code2, Eye } from "lucide-react";

interface MarkdownDeliverableProps {
  markdown: string;
  targetUrl: string;
}

export const MarkdownDeliverable: React.FC<MarkdownDeliverableProps> = ({ markdown, targetUrl }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"formatted" | "raw">("formatted");

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const domain = new URL(targetUrl).hostname.replace(/[^a-z0-9]/gi, "_");
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seo_audit_report_${domain}_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Standardized Markdown Deliverable (7 Sections)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Exact specification output formatted in clean GitHub-flavored Markdown
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 border border-zinc-200 dark:border-zinc-700 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("formatted")}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "formatted"
                  ? "bg-white dark:bg-zinc-900 font-medium text-zinc-900 dark:text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("raw")}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "raw"
                  ? "bg-white dark:bg-zinc-900 font-medium text-zinc-900 dark:text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Raw Markdown</span>
            </button>
          </div>

          <button
            id="download-markdown-btn"
            type="button"
            onClick={handleDownload}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.md</span>
          </button>

          <button
            id="copy-markdown-btn"
            type="button"
            onClick={handleCopy}
            className="text-xs font-medium px-3.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content View */}
      {viewMode === "raw" ? (
        <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
          <pre className="p-4 text-xs font-mono text-zinc-200 whitespace-pre-wrap max-h-[600px] overflow-y-auto leading-relaxed">
            {markdown}
          </pre>
        </div>
      ) : (
        <div className="p-6 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 max-h-[700px] overflow-y-auto font-sans text-zinc-800 dark:text-zinc-200 space-y-4">
          <div className="prose prose-zinc dark:prose-invert max-w-none text-xs leading-relaxed">
            <pre className="whitespace-pre-wrap font-sans text-xs bg-transparent p-0 m-0 border-0 text-zinc-800 dark:text-zinc-200">
              {markdown}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
