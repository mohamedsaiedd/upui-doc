import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  app.get("/api/components", async (_req, res) => {
    const components = await storage.getComponents();
    res.json(components);
  });

  app.get("/api/components/:name", async (req, res) => {
    const component = await storage.getComponentByName(req.params.name);
    if (!component) {
      res.status(404).json({ message: "Component not found" });
      return;
    }
    res.json(component);
  });

  app.get("/api/examples/:name", async (req, res) => {
    const examples = await storage.getExamples(req.params.name);
    if (!examples) {
      res.status(404).json({ message: "Examples not found" });
      return;
    }
    res.json(examples);
  });

  return createServer(app);
}
