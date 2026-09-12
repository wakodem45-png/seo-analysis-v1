import express from "express";
import dotenv from "dotenv";
import { executeAuditPipeline } from "./auditEngine";

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS and preflight handling for seamless browser API calls
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (_req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "SEO System Architect & Automated Audit Engine",
    version: "3.2.0",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    env: process.env.NODE_ENV || "development",
  });
});

router.get("/presets", (_req, res) => {
  res.json([
    {
      name: "Linear App",
      url: "https://linear.app",
      category: "SaaS & Developer Tooling",
      description: "Fast issue tracking for modern product teams",
    },
    {
      name: "Stripe",
      url: "https://stripe.com",
      category: "Fintech & Payments Infrastructure",
      description: "Financial infrastructure for the internet",
    },
    {
      name: "Notion",
      url: "https://notion.so",
      category: "Productivity & Knowledge Base",
      description: "Connected workspace for wiki, docs, and projects",
    },
    {
      name: "Shopify",
      url: "https://shopify.com",
      category: "E-Commerce Platform",
      description: "Global commerce engine for digital storefronts",
    },
    {
      name: "Zapier",
      url: "https://zapier.com",
      category: "Workflow Automation",
      description: "No-code workflow connectivity and app integrations",
    },
  ]);
});

router.post("/audit", async (req, res) => {
  const requestStartTime = Date.now();
  try {
    const { url } = req.body;
    if (!url || typeof url !== "string" || !url.trim()) {
      return res.status(400).json({
        error: "A valid target website URL is required.",
        code: "INVALID_URL",
        module: "API Gateway & Load Balancer",
      });
    }

    console.info(`[Audit Gateway] Initiating audit pipeline for: ${url.trim()}`);
    const report = await executeAuditPipeline(url.trim());
    const duration = Date.now() - requestStartTime;
    console.info(`[Audit Gateway] Audit pipeline succeeded in ${duration}ms for: ${url.trim()}`);
    return res.json(report);
  } catch (error: any) {
    const duration = Date.now() - requestStartTime;
    console.error(`[Audit Gateway] Pipeline execution failed after ${duration}ms:`, error);

    const errorMessage = error?.message || "An unexpected error occurred during SEO audit execution.";
    const failedModule = error?.module || "Core Orchestrator";

    return res.status(500).json({
      error: errorMessage,
      failedModule,
      durationMs: duration,
      timestamp: new Date().toISOString(),
      actionableGuidance: !process.env.GEMINI_API_KEY
        ? "GEMINI_API_KEY environment variable is not configured. Please add it to your deployment dashboard."
        : "Check server logs for upstream crawling network constraints or API rate limits.",
    });
  }
});

// Mount router on both /api and / to handle direct calls as well as Vercel rewrites seamlessly
app.use("/api", router);
app.use("/", router);

export default app;
