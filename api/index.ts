import app from "../server/app";

export const config = {
  maxDuration: 60,
};

// Resilient Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
  const invocationStart = Date.now();
  try {
    // Forward to Express application
    return app(req, res);
  } catch (fatalError: any) {
    const elapsed = Date.now() - invocationStart;
    console.error("[Vercel Serverless Fatal Exception]", {
      elapsedMs: elapsed,
      message: fatalError?.message,
      name: fatalError?.name,
      stack: fatalError?.stack,
    });
    if (!res.headersSent) {
      res.status(500).json({
        status: "error",
        error: fatalError?.message || "Serverless Function Invocation Failed",
        message: fatalError?.message || "Serverless Function Invocation Failed",
        code: "FATAL_INVOCATION_ERROR",
        module: "Serverless Entrypoint (api/index.ts)",
        stack: fatalError?.stack || String(fatalError),
        durationMs: elapsed,
      });
    }
  }
}

export { app };
