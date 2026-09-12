import express from "express";
import dotenv from "dotenv";
import { executeAuditPipeline } from "./auditEngine";

dotenv.config();

const app = express();
app.use(express.json());

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "SEO System Architect & Automated Audit Engine",
    version: "3.2.0",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
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
  try {
    const { url } = req.body;
    if (!url || typeof url !== "string" || !url.trim()) {
      return res.status(400).json({ error: "A valid target website URL is required." });
    }

    const report = await executeAuditPipeline(url);
    return res.json(report);
  } catch (error: any) {
    console.error("Audit processing failed:", error);
    return res.status(500).json({
      error: error?.message || "An unexpected error occurred during SEO audit execution.",
    });
  }
});

// Mount router on both /api and / to handle direct calls as well as Vercel rewrites seamlessly
app.use("/api", router);
app.use("/", router);

export default app;
