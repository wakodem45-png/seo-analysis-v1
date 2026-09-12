import express from "express";
import dotenv from "dotenv";
import { executeAuditPipeline } from "./auditEngine";

dotenv.config();

const app = express();

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

// Resilient Body Parsing Middleware:
// In Vercel Serverless Functions, @vercel/node may have already parsed req.body.
// If req.body is already an object, skip express.json() to prevent stream read collisions.
app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    return next();
  }
  express.json({ limit: "4.5mb" })(req, res, next);
});

// Also support urlencoded bodies if sent
app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    return next();
  }
  express.urlencoded({ extended: true, limit: "4.5mb" })(req, res, next);
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

// Audit Handler with multiple path aliases to support any Vercel rewrite pattern
const handleAudit = async (req: express.Request, res: express.Response) => {
  const requestStartTime = Date.now();
  try {
    let body = req.body;
    // Handle stringified body if Vercel didn't auto-parse JSON
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (parseErr) {
        return res.status(400).json({
          error: "Invalid JSON request payload provided.",
          code: "INVALID_JSON_BODY",
          module: "API Gateway & Load Balancer",
        });
      }
    }

    const url = body?.url;
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
    const statusCode = error?.statusCode || 500;

    return res.status(statusCode).json({
      error: errorMessage,
      failedModule,
      durationMs: duration,
      timestamp: new Date().toISOString(),
      actionableGuidance: !process.env.GEMINI_API_KEY
        ? "GEMINI_API_KEY environment variable is not configured in your Vercel Project Settings."
        : "Check server logs for upstream crawling network constraints or API rate limits.",
    });
  }
};

// Map audit route on router
router.post(["/audit", "/"], handleAudit);
app.post("/api/audit", handleAudit);

// Mount router on /api
app.use("/api", router);

// Catch-all 404 handler ONLY for unknown /api/* routes (so Vite/frontend can serve / and assets)
router.use((req, res) => {
  res.status(404).json({
    error: `API route not found: ${req.method} ${req.originalUrl || req.url}`,
    code: "ROUTE_NOT_FOUND",
    module: "API Gateway",
  });
});

// Global Express Error Middleware (catches synchronous & async errors)
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("[Global Error Middleware Caught]", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err?.statusCode || err?.status || 500).json({
    error: err?.message || "Internal server error occurred.",
    code: err?.code || "INTERNAL_SERVER_ERROR",
    failedModule: err?.module || "Core Orchestrator",
    details: process.env.NODE_ENV !== "production" ? err?.stack : undefined,
  });
});

export default app;
