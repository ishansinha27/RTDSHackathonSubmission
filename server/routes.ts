import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { gpus, searchParamsSchema } from "@shared/schema";
import { and, eq, lte } from "drizzle-orm";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to fetch resources based on search criteria
  app.get("/api/resources", async (req, res) => {
    try {
      // Validate query parameters
      const validationResult = searchParamsSchema.safeParse({
        region: req.query.region,
        budget: req.query.budget,
        os: req.query.os,
        hours: req.query.hours,
      });

      if (!validationResult.success) {
        return res.status(400).json({
          error: true,
          message: "Invalid search parameters",
          details: validationResult.error.errors,
        });
      }

      const { region, budget, os, hours } = validationResult.data;

      // Fetch resources from the database
      const resources = await db.query.gpus.findMany({
        where: and(
          eq(gpus.region, region),
          eq(gpus.operating_system, os)
        )
      });

      // Filter resources based on budget constraint
      const filteredResources = resources.filter(resource => {
        const totalCost = parseFloat(resource.price_per_hour.toString()) * hours;
        return totalCost <= budget;
      });

      return res.status(200).json({
        error: false,
        message: "Success",
        data: filteredResources,
      });
    } catch (error) {
      console.error("Error fetching resources:", error);
      return res.status(500).json({
        error: true,
        message: "Failed to fetch resources",
      });
    }
  });

  // API route to seed the database with initial data (can be used to fetch from external API)
  app.post("/api/resources/seed", async (req, res) => {
    try {
      // Check if we already have data
      const existingCount = await db.select({ count: gpus.id }).from(gpus);
      if (existingCount.length > 0 && existingCount[0].count > 0) {
        return res.status(200).json({
          error: false,
          message: "Database already seeded",
        });
      }

      // In a real application, you might fetch data from an external API here
      // For now, we'll use the sample data from the attached asset
      const sampleData = [
        {
          country: "india",
          operating_system: "windows",
          resource_class: "a100",
          resource_name: "W.N.A100.96",
          vcpus: 16,
          ram: 96,
          price_per_hour: 3.42,
          price_per_month: 1563,
          price_per_spot: 3.42,
          currency: "USD",
          is_gpu: 1,
          is_spot: 0,
          resource: "instances",
          resource_type: "gpu",
          region: "noida",
          gpu_description: "1x A100-80GB",
          is_public: 1
        },
        {
          country: "india",
          operating_system: "windows",
          resource_class: "a100",
          resource_name: "W.N.A100.128",
          vcpus: 16,
          ram: 128,
          price_per_hour: 2.148025786,
          price_per_month: 1363.529412,
          price_per_half_year: 7784.117647,
          price_per_year: 14774.11765,
          price_per_spot: 2.1481,
          currency: "USD",
          is_gpu: 1,
          is_spot: 0,
          resource: "instances",
          resource_type: "gpu",
          region: "noida",
          gpu_description: "1x A100",
          is_public: 1
        },
        {
          country: "india",
          operating_system: "windows",
          resource_class: "a100",
          resource_name: "W.N.A100.192",
          vcpus: 32,
          ram: 192,
          price_per_hour: 6.85,
          price_per_month: 3125,
          price_per_spot: 6.85,
          currency: "USD",
          is_gpu: 1,
          is_spot: 0,
          resource: "instances",
          resource_type: "gpu",
          region: "noida",
          gpu_description: "2x A100-80GB",
          is_public: 1
        },
        {
          country: "india",
          operating_system: "windows",
          resource_class: "a30",
          resource_name: "W.N.A30.32",
          vcpus: 8,
          ram: 32,
          price_per_hour: 0.842344883,
          price_per_month: 534.7058824,
          price_per_half_year: 3053.823529,
          price_per_year: 5798.823529,
          price_per_spot: 0.8424,
          currency: "USD",
          is_gpu: 1,
          is_spot: 0,
          resource: "instances",
          resource_type: "gpu",
          region: "noida",
          gpu_description: "1x A30",
          is_public: 1
        },
      ];

      // Add Linux variations for more variety
      const linuxVariations = sampleData.map(item => ({
        ...item,
        operating_system: "linux",
        resource_name: item.resource_name.replace("W", "L"),
        // Linux instances are typically cheaper
        price_per_hour: parseFloat((item.price_per_hour * 0.85).toFixed(8)),
        price_per_month: item.price_per_month ? parseFloat((item.price_per_month * 0.85).toFixed(8)) : undefined,
        price_per_half_year: item.price_per_half_year ? parseFloat((item.price_per_half_year * 0.85).toFixed(8)) : undefined,
        price_per_year: item.price_per_year ? parseFloat((item.price_per_year * 0.85).toFixed(8)) : undefined,
      }));

      // Add instances in different regions
      const regions = ["delhi", "bangalore", "mumbai"];
      const allVariations = [...sampleData, ...linuxVariations];
      
      const regionalVariations = regions.flatMap(region => 
        allVariations.map(item => ({
          ...item,
          region,
          // Small price variations across regions
          price_per_hour: parseFloat((item.price_per_hour * (0.95 + Math.random() * 0.1)).toFixed(8)),
        }))
      );

      // Insert all data into the database
      const allData = [...allVariations, ...regionalVariations];
      await db.insert(gpus).values(allData);

      return res.status(200).json({
        error: false,
        message: "Database seeded successfully",
        count: allData.length,
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      return res.status(500).json({
        error: true,
        message: "Failed to seed database",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
