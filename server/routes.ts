import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { gpus, searchParamsSchema } from "@shared/schema";
import { and, eq, lte } from "drizzle-orm";
import axios from "axios";

// Large sample dataset from the user
const gpuResourcesData = [
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
    "is_public": 1,
    "id": 1
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
    "is_public": 1,
    "id": 2
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
    "is_public": 1,
    "id": 3
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
    "is_public": 1,
    "id": 4
  },
  {
    "country": "india",
    "operating_system": "windows",
    "resource_class": "a30",
    "resource_name": "W.N.A30.64",
    "vcpus": 16,
    "ram": 64,
    "price_per_hour": 1.684689766,
    "price_per_month": 1069.411765,
    "price_per_half_year": 6107.647059,
    "price_per_year": 11597.64706,
    "price_per_spot": 1.6847,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "2x A30",
    "is_public": 1,
    "id": 5
  },
  {
    "country": "india",
    "operating_system": "windows",
    "resource_class": "a2",
    "resource_name": "W.N.A2.16",
    "vcpus": 8,
    "ram": 16,
    "price_per_hour": 0.32,
    "price_per_month": 188,
    "price_per_spot": 0.2048,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x A2-16GB",
    "is_public": 1,
    "id": 6
  },
  {
    "country": "india",
    "operating_system": "windows",
    "resource_class": "a2",
    "resource_name": "W.N.A2.32",
    "vcpus": 8,
    "ram": 32,
    "price_per_hour": 0.309508461,
    "price_per_month": 196.4705882,
    "price_per_half_year": 1125.882353,
    "price_per_year": 2145.882353,
    "price_per_spot": 0.1981,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x A2",
    "is_public": 1,
    "id": 7
  },
  {
    "country": "india",
    "operating_system": "windows",
    "resource_class": "rtx a6000",
    "resource_name": "W.N.RTXA6000.64",
    "vcpus": 16,
    "ram": 64,
    "price_per_hour": 0.931768735,
    "price_per_month": 591.4705882,
    "price_per_half_year": 3383.382353,
    "price_per_year": 6435.882353,
    "price_per_spot": 0.6523,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x RTX A6000",
    "is_public": 1,
    "id": 8
  },
  {
    "country": "india",
    "operating_system": "windows",
    "resource_class": "rtx a6000",
    "resource_name": "W.N.RTXA6000.128",
    "vcpus": 24,
    "ram": 128,
    "price_per_hour": 1.021192587,
    "price_per_month": 648.2352941,
    "price_per_half_year": 3712.941176,
    "price_per_year": 7072.941176,
    "price_per_spot": 0.7149,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x RTX A6000",
    "is_public": 1,
    "id": 9
  },
  {
    "country": "india",
    "operating_system": "windows",
    "resource_class": "rtx a6000",
    "resource_name": "W.N.RTXA6000.192",
    "vcpus": 32,
    "ram": 192,
    "price_per_hour": 1.979371475,
    "price_per_month": 1256.470588,
    "price_per_half_year": 7185.882353,
    "price_per_year": 13665.88235,
    "price_per_spot": 1.3856,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "2x RTX A6000",
    "is_public": 1,
    "id": 10
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a100",
    "resource_name": "L.N.A100.96",
    "vcpus": 16,
    "ram": 96,
    "price_per_hour": 2.907,
    "price_per_month": 1329,
    "price_per_spot": 2.907,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x A100-80GB",
    "is_public": 1,
    "id": 11
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a100",
    "resource_name": "L.N.A100.128",
    "vcpus": 16,
    "ram": 128,
    "price_per_hour": 1.825,
    "price_per_month": 1159,
    "price_per_half_year": 6616,
    "price_per_year": 12558,
    "price_per_spot": 1.826,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x A100",
    "is_public": 1,
    "id": 12
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a100",
    "resource_name": "L.N.A100.192",
    "vcpus": 32,
    "ram": 192,
    "price_per_hour": 5.82,
    "price_per_month": 2656,
    "price_per_spot": 5.82,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "2x A100-80GB",
    "is_public": 1,
    "id": 13
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a30",
    "resource_name": "L.N.A30.32",
    "vcpus": 8,
    "ram": 32,
    "price_per_hour": 0.72,
    "price_per_month": 455,
    "price_per_half_year": 2596,
    "price_per_year": 4929,
    "price_per_spot": 0.72,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x A30",
    "is_public": 1,
    "id": 14
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a30",
    "resource_name": "L.N.A30.64",
    "vcpus": 16,
    "ram": 64,
    "price_per_hour": 1.43,
    "price_per_month": 909,
    "price_per_half_year": 5192,
    "price_per_year": 9859,
    "price_per_spot": 1.43,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "2x A30",
    "is_public": 1,
    "id": 15
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "l4",
    "resource_name": "L.N.L4.16",
    "vcpus": 4,
    "ram": 16,
    "price_per_hour": 0.663,
    "price_per_month": 345,
    "price_per_spot": 0.232,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x L4 - 24 GB",
    "is_public": 1,
    "id": 16
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "l4",
    "resource_name": "L.N.L4.64",
    "vcpus": 16,
    "ram": 64,
    "price_per_hour": 0.595,
    "price_per_month": 377,
    "price_per_half_year": 2163,
    "price_per_year": 4121,
    "price_per_spot": 0.208,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x L4",
    "is_public": 1,
    "id": 17
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "l4",
    "resource_name": "L.N.L4.96",
    "vcpus": 24,
    "ram": 96,
    "price_per_hour": 1.124,
    "price_per_month": 714,
    "price_per_half_year": 4082,
    "price_per_year": 7767,
    "price_per_spot": 0.393,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "2x L4",
    "is_public": 1,
    "id": 18
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "l4",
    "resource_name": "L.N.L4.128",
    "vcpus": 32,
    "ram": 128,
    "price_per_hour": 1.19,
    "price_per_month": 755,
    "price_per_half_year": 4327,
    "price_per_year": 8241,
    "price_per_spot": 0.417,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "2x L4",
    "is_public": 1,
    "id": 19
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "rtx a6000",
    "resource_name": "L.N.RTXA6000.64",
    "vcpus": 16,
    "ram": 64,
    "price_per_hour": 0.79,
    "price_per_month": 502,
    "price_per_half_year": 2876,
    "price_per_year": 5471,
    "price_per_spot": 0.554,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "noida",
    "gpu_description": "1x RTX A6000",
    "is_public": 1,
    "id": 20
  }
];

// Add Linux variations for different regions
const otherRegionsData = [
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a100",
    "resource_name": "L.D.A100.96",
    "vcpus": 16,
    "ram": 96,
    "price_per_hour": 2.85,
    "price_per_month": 1300,
    "price_per_spot": 2.85,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "delhi",
    "gpu_description": "1x A100-80GB",
    "is_public": 1,
    "id": 21
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a30",
    "resource_name": "L.D.A30.32",
    "vcpus": 8,
    "ram": 32,
    "price_per_hour": 0.71,
    "price_per_month": 450,
    "price_per_half_year": 2570,
    "price_per_year": 4900,
    "price_per_spot": 0.71,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "delhi",
    "gpu_description": "1x A30",
    "is_public": 1,
    "id": 22
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "l4",
    "resource_name": "L.D.L4.16",
    "vcpus": 4,
    "ram": 16,
    "price_per_hour": 0.65,
    "price_per_month": 340,
    "price_per_spot": 0.228,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "delhi",
    "gpu_description": "1x L4 - 24 GB",
    "is_public": 1,
    "id": 23
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a100",
    "resource_name": "L.B.A100.96",
    "vcpus": 16,
    "ram": 96,
    "price_per_hour": 2.95,
    "price_per_month": 1350,
    "price_per_spot": 2.95,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 0,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "bangalore",
    "gpu_description": "1x A100-80GB",
    "is_public": 1,
    "id": 24
  },
  {
    "country": "india",
    "operating_system": "linux",
    "resource_class": "a2",
    "resource_name": "L.B.A2.16",
    "vcpus": 8,
    "ram": 16,
    "price_per_hour": 0.272,
    "price_per_month": 160,
    "price_per_spot": 0.1741,
    "currency": "USD",
    "is_gpu": 1,
    "is_spot": 1,
    "resource": "instances",
    "resource_type": "gpu",
    "region": "bangalore",
    "gpu_description": "1x A2-16GB",
    "is_public": 1,
    "id": 25
  }
];

// Combine all the data
const allGpuData = [...gpuResourcesData, ...otherRegionsData];

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
      const hoursNum = Number(hours);
      const budgetNum = Number(budget);

      console.log(`Search params - Region: ${region}, Budget: ${budgetNum}, OS: ${os}, Hours: ${hoursNum}`);

      // Map our frontend region names to the API's region format
      const regionMap: Record<string, string> = {
        'noida': 'ap-south-noi-1',
        'delhi': 'ap-south-del-1',
        'bangalore': 'ap-south-blr-1',
        'mumbai': 'ap-south-mum-1'
      };

      // Define inverse mapping for API response processing
      const inverseRegionMap: Record<string, string> = {};
      Object.entries(regionMap).forEach(([key, value]) => {
        inverseRegionMap[value] = key;
      });

      const apiRegion = regionMap[region];
      let resources = [];

      try {
        // Try fetching from the external API first
        if (apiRegion) {
          const apiUrl = `https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=${apiRegion}`;
          console.log(`Fetching from API: ${apiUrl}`);
          
          const response = await axios.get(apiUrl);
          
          if (response.data && response.data.data && Array.isArray(response.data.data)) {
            resources = response.data.data;
            console.log(`Successfully fetched ${resources.length} resources from external API for region ${region}`);
          }
        } else {
          console.log(`No API region mapping for ${region}, using sample data`);
          // If no mapping exists, fall back immediately to sample data
          resources = allGpuData;
        }
      } catch (apiError) {
        console.error("API request failed, falling back to sample data:", apiError);
        // Fall back to our sample data
        resources = allGpuData;
      }

      // Debug logging
      console.log(`Total resources before filtering: ${resources.length}`);

      // Filter resources based on OS first
      let filteredResources = resources.filter((resource: any) => {
        return resource.operating_system === os.toLowerCase();
      });

      console.log(`Resources after OS filtering (${os}): ${filteredResources.length}`);

      // Then filter by region
      filteredResources = filteredResources.filter((resource: any) => {
        // For API data, region might be in full format (ap-south-noi-1)
        const resourceRegion = resource.region;
        
        // Check if it's a direct match to our simplified region name
        if (resourceRegion === region) {
          return true;
        }
        
        // Check if it matches the API format of our region
        if (resourceRegion === apiRegion) {
          return true; 
        }
        
        // Check if it's an API format that we can map back to our simple name
        if (inverseRegionMap[resourceRegion] === region) {
          return true;
        }
        
        return false;
      });

      console.log(`Resources after region filtering (${region}): ${filteredResources.length}`);

      // Apply budget filter - this is the critical part
      filteredResources = filteredResources.filter((resource: any) => {
        // Ensure price_per_hour is treated as a number
        const hourlyPrice = typeof resource.price_per_hour === 'number' 
          ? resource.price_per_hour 
          : parseFloat(resource.price_per_hour);
        
        const totalCost = hourlyPrice * hoursNum;
        
        console.log(`Resource: ${resource.resource_name}, Hourly price: $${hourlyPrice}, Total cost for ${hoursNum} hours: $${totalCost}, Budget: $${budgetNum}, Within budget: ${totalCost <= budgetNum}`);
        
        return totalCost <= budgetNum;
      });

      console.log(`Resources after budget filtering (<= $${budgetNum}): ${filteredResources.length}`);

      // Sort by price (cheapest first)
      filteredResources = filteredResources.sort((a: any, b: any) => {
        const priceA = typeof a.price_per_hour === 'number' 
          ? a.price_per_hour 
          : parseFloat(a.price_per_hour);
        
        const priceB = typeof b.price_per_hour === 'number' 
          ? b.price_per_hour 
          : parseFloat(b.price_per_hour);
        
        return priceA - priceB;
      });

      // Return top 5 results
      const topResults = filteredResources.slice(0, 5);
      console.log(`Returning top ${topResults.length} results`);

      // Log the exact results we're returning
      topResults.forEach((resource: any, index: number) => {
        const hourlyPrice = typeof resource.price_per_hour === 'number' 
          ? resource.price_per_hour 
          : parseFloat(resource.price_per_hour);
          
        console.log(`Result ${index + 1}: ${resource.resource_name}, Price: $${hourlyPrice}/hr, Total: $${(hourlyPrice * hoursNum).toFixed(2)}`);
      });

      return res.status(200).json({
        error: false,
        message: "Success",
        data: topResults,
      });
    } catch (error) {
      console.error("Error fetching resources:", error);
      return res.status(500).json({
        error: true,
        message: "Failed to fetch resources",
      });
    }
  });

  // API route to fetch from external AceCloud service
  app.get("/api/external-resources", async (req, res) => {
    try {
      const { region } = req.query;
      
      if (!region || typeof region !== 'string') {
        return res.status(400).json({
          error: true,
          message: "Region parameter is required",
        });
      }

      try {
        // Map our frontend region names to the API's region format
        const regionMap: Record<string, string> = {
          'noida': 'ap-south-noi-1',
          'delhi': 'ap-south-del-1',
          'bangalore': 'ap-south-blr-1',
          'mumbai': 'ap-south-mum-1'
        };

        const apiRegion = regionMap[region] || region;
        
        // Make the actual API call to AceCloud
        const apiUrl = `https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=${apiRegion}`;
        
        try {
          const response = await axios.get(apiUrl);
          const data = response.data;
          
          return res.status(200).json({
            error: false,
            message: "Success",
            data: data.data || [],
          });
        } catch (axiosError) {
          console.error("AceCloud API request failed:", axiosError);
          
          // Fall back to our sample data if the API call fails
          console.log("Falling back to sample data for region:", region);
          const regionData = allGpuData.filter(item => item.region === region);
          
          return res.status(200).json({
            error: false,
            message: "Success (using sample data)",
            data: regionData,
          });
        }
      } catch (apiError) {
        console.error("API request failed:", apiError);
        return res.status(502).json({
          error: true,
          message: "Failed to fetch data from external API",
        });
      }
    } catch (error) {
      console.error("Error in external resources endpoint:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
