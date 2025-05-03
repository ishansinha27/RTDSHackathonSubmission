import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table (keeping existing table)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Resources table to cache API responses
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  operating_system: text("operating_system").notNull(),
  resource_class: text("resource_class").notNull(),
  resource_name: text("resource_name").notNull(),
  vcpus: integer("vcpus").notNull(),
  ram: integer("ram").notNull(),
  price_per_hour: decimal("price_per_hour", { precision: 10, scale: 6 }).notNull(),
  price_per_month: decimal("price_per_month", { precision: 10, scale: 6 }).notNull(),
  price_per_half_year: decimal("price_per_half_year", { precision: 10, scale: 6 }),
  price_per_year: decimal("price_per_year", { precision: 10, scale: 6 }),
  price_per_spot: decimal("price_per_spot", { precision: 10, scale: 6 }).notNull(),
  currency: text("currency").notNull(),
  is_gpu: integer("is_gpu").notNull(),
  is_spot: integer("is_spot").notNull(),
  resource: text("resource").notNull(),
  resource_type: text("resource_type").notNull(),
  region: text("region").notNull(),
  gpu_description: text("gpu_description").notNull(),
  is_public: integer("is_public").notNull(),
  cached_at: timestamp("cached_at").defaultNow().notNull(),
});

export const resourcesSchema = createInsertSchema(resources);
export type Resource = typeof resources.$inferSelect;

// Search history table
export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  region: text("region").notNull(),
  operating_system: text("operating_system").notNull(),
  budget: decimal("budget", { precision: 10, scale: 2 }).notNull(),
  usage_hours: integer("usage_hours").notNull(),
  results_count: integer("results_count").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const searchesSchema = createInsertSchema(searches);
export type Search = typeof searches.$inferSelect;

// Schema for validating search form submissions
export const resourceSearchSchema = z.object({
  region: z.string({
    required_error: "Region is required",
  }),
  operatingSystem: z.string({
    required_error: "Operating system is required",
  }),
  budget: z.number({
    required_error: "Budget is required",
  }).positive("Budget must be greater than zero"),
  usageHours: z.number({
    required_error: "Usage hours is required",
  }).positive("Usage hours must be greater than zero"),
});

export type ResourceSearch = z.infer<typeof resourceSearchSchema>;
