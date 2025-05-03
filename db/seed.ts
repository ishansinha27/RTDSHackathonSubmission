import { db } from "./index";
import * as schema from "@shared/schema";

// Sample GPU resource data based on the uploaded file
const resourcesData = [
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
    is_public: 1,
    cached_at: new Date(),
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
    is_public: 1,
    cached_at: new Date(),
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
    is_public: 1,
    cached_at: new Date(),
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
    is_public: 1,
    cached_at: new Date(),
  },
  // Adding some Linux options as well for variety
  {
    country: "india",
    operating_system: "linux",
    resource_class: "a100",
    resource_name: "L.N.A100.96",
    vcpus: 16,
    ram: 96,
    price_per_hour: 3.10,
    price_per_month: 1400,
    price_per_spot: 3.10,
    currency: "USD",
    is_gpu: 1,
    is_spot: 0,
    resource: "instances",
    resource_type: "gpu",
    region: "noida",
    gpu_description: "1x A100-80GB",
    is_public: 1,
    cached_at: new Date(),
  },
  {
    country: "india",
    operating_system: "linux",
    resource_class: "a30",
    resource_name: "L.N.A30.32",
    vcpus: 8,
    ram: 32,
    price_per_hour: 0.75,
    price_per_month: 500,
    price_per_spot: 0.75,
    currency: "USD",
    is_gpu: 1,
    is_spot: 0,
    resource: "instances",
    resource_type: "gpu",
    region: "noida",
    gpu_description: "1x A30",
    is_public: 1,
    cached_at: new Date(),
  },
  // Adding resources in different regions
  {
    country: "india",
    operating_system: "windows",
    resource_class: "a100",
    resource_name: "W.M.A100.96",
    vcpus: 16,
    ram: 96,
    price_per_hour: 3.50,
    price_per_month: 1600,
    price_per_spot: 3.50,
    currency: "USD",
    is_gpu: 1,
    is_spot: 0,
    resource: "instances",
    resource_type: "gpu",
    region: "mumbai",
    gpu_description: "1x A100-80GB",
    is_public: 1,
    cached_at: new Date(),
  },
  {
    country: "india",
    operating_system: "windows",
    resource_class: "a30",
    resource_name: "W.M.A30.32",
    vcpus: 8,
    ram: 32,
    price_per_hour: 0.90,
    price_per_month: 550,
    price_per_spot: 0.90,
    currency: "USD",
    is_gpu: 1,
    is_spot: 0,
    resource: "instances",
    resource_type: "gpu",
    region: "mumbai",
    gpu_description: "1x A30",
    is_public: 1,
    cached_at: new Date(),
  },
];

// Sample search history
const searchesData = [
  {
    region: "noida",
    operating_system: "windows",
    budget: 1000,
    usage_hours: 100,
    results_count: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  },
  {
    region: "mumbai",
    operating_system: "linux",
    budget: 500,
    usage_hours: 50,
    results_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    region: "delhi",
    operating_system: "windows",
    budget: 2000,
    usage_hours: 200,
    results_count: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

async function seed() {
  try {
    // Check if resources already exist to avoid duplicates
    const existingResources = await db.select().from(schema.resources);
    
    if (existingResources.length === 0) {
      console.log("Seeding resources...");
      
      // Insert resources
      for (const resource of resourcesData) {
        await db.insert(schema.resources).values(resource);
      }
      
      console.log(`Seeded ${resourcesData.length} resources.`);
    } else {
      console.log(`Skipping resource seeding. ${existingResources.length} resources already exist.`);
    }
    
    // Check if searches already exist to avoid duplicates
    const existingSearches = await db.select().from(schema.searches);
    
    if (existingSearches.length === 0) {
      console.log("Seeding searches...");
      
      // Insert searches
      for (const search of searchesData) {
        await db.insert(schema.searches).values(search);
      }
      
      console.log(`Seeded ${searchesData.length} searches.`);
    } else {
      console.log(`Skipping search seeding. ${existingSearches.length} searches already exist.`);
    }
    
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
