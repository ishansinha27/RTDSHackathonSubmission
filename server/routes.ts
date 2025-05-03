import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { resourceSearchSchema } from "@shared/schema";
import { z } from "zod";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get resources based on form inputs
  app.post("/api/resources", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = resourceSearchSchema.parse(req.body);
      
      // Check if we have cached data for this search
      const cachedResults = await storage.getCachedResults(
        validatedData.region,
        validatedData.operatingSystem
      );
      
      let resources;
      
      if (cachedResults) {
        console.log("Using cached data for resource search");
        resources = cachedResults;
      } else {
        console.log("Fetching fresh data for resource search");
        
        // Fetch data from external API
        try {
          const response = await axios.get(`https://api.example.com/resources?country=india&region=${validatedData.region}`);
          
          // For demonstration purposes, hardcoding a sample response that matches the uploaded file structure
          // In a real implementation, you would use response.data
          const apiResponse = {
            "error": false,
            "message": "Success",
            "data": [
              {
                "country": "india",
                "operating_system": "windows",
                "resource_class": "a100",
                "resource_name": "W.N.A100.96",
                "vcpus": 16,
                "ram": 96,
                "price_per_hour": 3.42,
                "price_per_month": 1563,
                "price_per_spot": 3.42,
                "currency": "USD",
                "is_gpu": 1,
                "is_spot": 0,
                "resource": "instances",
                "resource_type": "gpu",
                "region": "noida",
                "gpu_description": "1x A100-80GB",
                "is_public": 1
              },
              {
                "country": "india",
                "operating_system": "windows",
                "resource_class": "a100",
                "resource_name": "W.N.A100.128",
                "vcpus": 16,
                "ram": 128,
                "price_per_hour": 2.148025786,
                "price_per_month": 1363.529412,
                "price_per_half_year": 7784.117647,
                "price_per_year": 14774.11765,
                "price_per_spot": 2.1481,
                "currency": "USD",
                "is_gpu": 1,
                "is_spot": 0,
                "resource": "instances",
                "resource_type": "gpu",
                "region": "noida",
                "gpu_description": "1x A100",
                "is_public": 1
              },
              {
                "country": "india",
                "operating_system": "windows",
                "resource_class": "a100",
                "resource_name": "W.N.A100.192",
                "vcpus": 32,
                "ram": 192,
                "price_per_hour": 6.85,
                "price_per_month": 3125,
                "price_per_spot": 6.85,
                "currency": "USD",
                "is_gpu": 1,
                "is_spot": 0,
                "resource": "instances",
                "resource_type": "gpu",
                "region": "noida",
                "gpu_description": "2x A100-80GB",
                "is_public": 1
              },
              {
                "country": "india",
                "operating_system": "windows",
                "resource_class": "a30",
                "resource_name": "W.N.A30.32",
                "vcpus": 8,
                "ram": 32,
                "price_per_hour": 0.842344883,
                "price_per_month": 534.7058824,
                "price_per_half_year": 3053.823529,
                "price_per_year": 5798.823529,
                "price_per_spot": 0.8424,
                "currency": "USD",
                "is_gpu": 1,
                "is_spot": 0,
                "resource": "instances",
                "resource_type": "gpu",
                "region": "noida",
                "gpu_description": "1x A30",
                "is_public": 1
              }
            ]
          };
          
          resources = apiResponse.data;
          
          // Cache the results
          await storage.cacheResults(
            validatedData.region,
            validatedData.operatingSystem,
            resources
          );
          
        } catch (error) {
          console.error("Error fetching resource data:", error);
          return res.status(500).json({ error: "Failed to fetch resource data" });
        }
      }
      
      // Filter resources based on budget constraints
      const filteredResources = resources.filter(resource => {
        const isRegionMatch = resource.region.toLowerCase() === validatedData.region.toLowerCase();
        const isOSMatch = resource.operating_system.toLowerCase() === validatedData.operatingSystem.toLowerCase();
        const hourlyTotal = resource.price_per_hour * validatedData.usageHours;
        const isBudgetMatch = hourlyTotal <= validatedData.budget;
        
        return isRegionMatch && isOSMatch && isBudgetMatch;
      });
      
      // Save the search request
      await storage.saveSearch({
        region: validatedData.region,
        operatingSystem: validatedData.operatingSystem,
        budget: validatedData.budget,
        usageHours: validatedData.usageHours,
        resultsCount: filteredResources.length
      });
      
      return res.status(200).json(filteredResources);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      
      console.error("Error processing resource search:", error);
      return res.status(500).json({ error: "An error occurred while processing your request" });
    }
  });

  // Get all previous searches
  app.get("/api/searches", async (_req: Request, res: Response) => {
    try {
      const searches = await storage.getAllSearches();
      return res.status(200).json(searches);
    } catch (error) {
      console.error("Error fetching searches:", error);
      return res.status(500).json({ error: "Failed to fetch search history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
