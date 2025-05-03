import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Define GPUs table to store the GPU resource data
export const gpus = pgTable("gpus", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  operating_system: text("operating_system").notNull(),
  resource_class: text("resource_class").notNull(),
  resource_name: text("resource_name").notNull(),
  vcpus: integer("vcpus").notNull(),
  ram: integer("ram").notNull(),
  price_per_hour: decimal("price_per_hour", { precision: 10, scale: 8 }).notNull(),
  price_per_month: decimal("price_per_month", { precision: 10, scale: 8 }),
  price_per_half_year: decimal("price_per_half_year", { precision: 10, scale: 8 }),
  price_per_year: decimal("price_per_year", { precision: 10, scale: 8 }),
  price_per_spot: decimal("price_per_spot", { precision: 10, scale: 8 }),
  currency: text("currency").notNull(),
  is_gpu: boolean("is_gpu").notNull(),
  is_spot: boolean("is_spot").notNull(),
  resource: text("resource").notNull(),
  resource_type: text("resource_type").notNull(),
  region: text("region").notNull(),
  gpu_description: text("gpu_description").notNull(),
  is_public: boolean("is_public").notNull(),
});

// Create validation schemas
export const gpuInsertSchema = createInsertSchema(gpus);
export const gpuSelectSchema = createSelectSchema(gpus);

// Define types
export type GpuInsert = z.infer<typeof gpuInsertSchema>;
export type Gpu = z.infer<typeof gpuSelectSchema>;

// Define search params validation schema
export const searchParamsSchema = z.object({
  region: z.string().min(1),
  budget: z.coerce.number().positive(),
  os: z.string().min(1),
  hours: z.coerce.number().positive(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

// Keep the existing users table
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
