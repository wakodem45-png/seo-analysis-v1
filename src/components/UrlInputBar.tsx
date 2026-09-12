import React, { useState } from "react";
import { Globe, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

interface UrlInputBarProps {
  currentUrl: string;
  isLoading: boolean;
  onAudit: (url: string) => void;
}

const PRESETS = [
  { label: "Linear", url: "https://linear.app", tag: "SaaS" },
  { label: "Stripe", url: "https://stripe.com", tag: "Fintech" },
  { label: "Notion", url: "https://notion.so", tag: "Productivity" },
  { label: "Shopify", url: "https://shopify.com", tag: "E-Commerce" },
  { label: "Zapier", url: "https://zapier.com", tag: "Automation" },
];

export const UrlInputBar: React.FC<UrlInputBarProps> = ({ currentUrl, isLoading, onAudit }) => {
  const [inputVal, setInputVal] = useState(currentUrl || "https://linear.app");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onAudit(inputVal.trim());
  };

  const handleSelectPreset = (url: string) => {
    setInputVal(url);
    if (!isLoading) {
      onAudit(url);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Globe className="w-4 h-4" />
          </div>
          <input
            id="target-url-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter target website URL (e.g., https://example.com)"
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all font-mono"
          />
        </div>

        <button
          id="run-audit-btn"
          type="submit"
          disabled={isLoading || !inputVal.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Orchestrating Pipeline...</span>
            </>
          ) : (
            <>
              <span>Run Automated Audit</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Preset test targets */}
      <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-400 dark:text-zinc-500 font-medium">Quick Test Targets:</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {PRESETS.map((preset) => {
            const isSelected = inputVal.toLowerCase().includes(preset.label.toLowerCase());
            return (
              <button
                key={preset.label}
                id={`preset-${preset.label.toLowerCase()}-btn`}
                type="button"
                onClick={() => handleSelectPreset(preset.url)}
                disabled={isLoading}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent font-medium"
                    : "bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/80"
                }`}
              >
                <span>{preset.label}</span>
                <span className="text-[10px] opacity-70 px-1 py-0.2 rounded bg-black/10 dark:bg-white/15">
                  {preset.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
