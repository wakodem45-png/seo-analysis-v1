import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { executeAuditPipeline } from "./server/auditEngine";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "SEO System Architect & Automated Audit Engine",
    version: "3.2.0",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.get("/api/presets", (_req, res) => {
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

app.post("/api/audit", async (req, res) => {
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

// Setup Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SEO Audit Engine server running on http://localhost:${PORT}`);
  });
}

startServer();
