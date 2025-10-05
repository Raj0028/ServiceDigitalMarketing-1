import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";
import { passport, requireAuth } from "./auth";

const IP_RATE_LIMIT = 5;
const IP_RATE_LIMIT_DAYS = 7;

async function checkIpRateLimit(ipAddress: string): Promise<boolean> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - IP_RATE_LIMIT_DAYS);
  
  const recentSubmissions = await storage.getInquiriesByIpAndDateRange(ipAddress, startDate);
  return recentSubmissions.length < IP_RATE_LIMIT;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.json({
      success: true,
      user: { id: (req.user as any).id, email: (req.user as any).email }
    });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error logging out"
        });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        success: true,
        user: { id: (req.user as any).id, email: (req.user as any).email }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const ipAddress = req.ip || req.socket.remoteAddress || "unknown";
      
      const canSubmit = await checkIpRateLimit(ipAddress);
      if (!canSubmit) {
        return res.status(429).json({
          success: false,
          message: `You have reached the maximum of ${IP_RATE_LIMIT} submissions within ${IP_RATE_LIMIT_DAYS} days. Please try again later.`
        });
      }

      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry({
        ...validatedData,
        ipAddress
      });
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

  app.get("/api/inquiries", requireAuth, async (req, res) => {
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

  app.get("/api/inquiries/:platform", requireAuth, async (req, res) => {
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

  app.patch("/api/inquiries/:id/remark", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { remarks } = req.body;

      if (typeof remarks !== "string") {
        return res.status(400).json({
          success: false,
          message: "Remarks must be a string"
        });
      }

      const inquiry = await storage.updateInquiryRemark(id, remarks);
      if (!inquiry) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found"
        });
      }

      res.json({ success: true, inquiry });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update remark"
      });
    }
  });

  app.delete("/api/inquiries/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteInquiry(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found"
        });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete inquiry"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
