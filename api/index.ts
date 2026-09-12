import app from "../server/app";

// Resilient Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
  try {
    // Forward to Express application
    return app(req, res);
  } catch (fatalError: any) {
    console.error("[Vercel Serverless Fatal Exception]", fatalError);
    if (!res.headersSent) {
      res.status(500).json({
        error: fatalError?.message || "Serverless Function Invocation Failed",
        code: "FATAL_INVOCATION_ERROR",
        module: "Serverless Entrypoint (api/index.ts)",
        details: fatalError?.stack || String(fatalError),
      });
    }
  }
}

export { app };
