import { users, inquiries, type User, type InsertUser, type Inquiry, type InsertInquiry } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  createInquiry(inquiry: InsertInquiry & { ipAddress: string }): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getInquiriesByPlatform(platform: string): Promise<Inquiry[]>;
  getInquiriesByIpAndDateRange(ipAddress: string, startDate: Date): Promise<Inquiry[]>;
  updateInquiryRemark(id: string, remarks: string): Promise<Inquiry | undefined>;
  deleteInquiry(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createInquiry(insertInquiry: InsertInquiry & { ipAddress: string }): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async getInquiriesByPlatform(platform: string): Promise<Inquiry[]> {
    return await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.platform, platform))
      .orderBy(desc(inquiries.createdAt));
  }

  async getInquiriesByIpAndDateRange(ipAddress: string, startDate: Date): Promise<Inquiry[]> {
    return await db
      .select()
      .from(inquiries)
      .where(and(
        eq(inquiries.ipAddress, ipAddress),
        gte(inquiries.createdAt, startDate)
      ));
  }

  async updateInquiryRemark(id: string, remarks: string): Promise<Inquiry | undefined> {
    const [inquiry] = await db
      .update(inquiries)
      .set({ remarks })
      .where(eq(inquiries.id, id))
      .returning();
    return inquiry || undefined;
  }

  async deleteInquiry(id: string): Promise<boolean> {
    const result = await db
      .delete(inquiries)
      .where(eq(inquiries.id, id))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
