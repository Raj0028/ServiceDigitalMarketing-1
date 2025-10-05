import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { passport, requireAuth, hashPassword } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Check if registration is allowed (only if no users exist)
  app.get("/api/auth/can-register", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ success: true, canRegister: users.length === 0 });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to check registration status"
      });
    }
  });

  // Auth routes - Registration (only allowed if no users exist)
  app.post("/api/auth/register", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      if (users.length > 0) {
        return res.status(403).json({
          success: false,
          message: "Registration is disabled. Admin account already exists."
        });
      }

      const { username, password } = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(username);
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists"
        });
      }

      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({ username, password: hashedPassword });
      
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error logging in after registration"
          });
        }
        res.json({
          success: true,
          user: { id: user.id, username: user.username }
        });
      });
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
          message: "Failed to register user"
        });
      }
    }
  });

  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.json({
      success: true,
      user: { id: (req.user as any).id, username: (req.user as any).username }
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
        user: { id: (req.user as any).id, username: (req.user as any).username }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }
  });

  // Submit inquiry form (public)
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

  // Get all inquiries (protected - admin only)
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

  // Get inquiries by platform (protected - admin only)
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

  const httpServer = createServer(app);
  return httpServer;
}
