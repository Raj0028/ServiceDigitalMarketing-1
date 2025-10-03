import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit inquiry form
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.json({ success: true, inquiry });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to submit inquiry"
        });
      }
    }
  });

  // Get all inquiries (for admin purposes)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json({ success: true, inquiries });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch inquiries"
      });
    }
  });

  // Get inquiries by platform
  app.get("/api/inquiries/:platform", async (req, res) => {
    try {
      const { platform } = req.params;
      const inquiries = await storage.getInquiriesByPlatform(platform);
      res.json({ success: true, inquiries });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch inquiries"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
