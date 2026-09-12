import React, { useState } from "react";
import { Cpu, Server, Activity, Layers, Terminal, Sparkles, Database } from "lucide-react";

interface HeaderProps {
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenArchitecture }) => {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                SEO System Architect
              </h1>
              <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                Audit Engine v3.2
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Automated multi-engine crawling, deterministic rules validation, and AI/NLP intent profiling
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Active cluster micro-indicators */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Gateway
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="flex items-center gap-1">
              <Server className="w-3 h-3 text-zinc-400" />
              Crawler
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              AI/NLP
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-blue-500" />
              SEO APIs
            </span>
          </div>

          <button
            id="open-architecture-btn"
            onClick={onOpenArchitecture}
            className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            System Blueprint
          </button>
        </div>
      </div>
    </header>
  );
};
