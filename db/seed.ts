import { db } from "./index";
import { gpus } from "@shared/schema";

async function seed() {
  try {
    // Check if data already exists
    const existingCount = await db.select({ count: gpus.id }).from(gpus);
    if (existingCount.length > 0 && existingCount[0].count > 0) {
      console.log("Database already seeded with GPU data, skipping...");
      return;
    }
    
    console.log("Seeding database with GPU instance data...");
    
    // Sample data from the provided JSON
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
        is_gpu: true,
        is_spot: false,
        resource: "instances",
        resource_type: "gpu",
        region: "noida",
        gpu_description: "1x A100-80GB",
        is_public: true
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
        is_gpu: true,
        is_spot: false,
        resource: "instances",
        resource_type: "gpu",
        region: "noida",
        gpu_description: "1x A100",
        is_public: true
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
        is_gpu: true,
        is_spot: false,
        resource: "instances",
        resource_type: "gpu",
        region: "noida",
        gpu_description: "2x A100-80GB",
        is_public: true
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
        is_gpu: true,
        is_spot: false,
        resource: "instances",
        resource_type: "gpu",
        region: "noida",
        gpu_description: "1x A30",
        is_public: true
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

    console.log(`Seeded database with ${allData.length} GPU instances`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
