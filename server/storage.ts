import { db } from "@db";
import { 
  resources, 
  searches, 
  searchesSchema,
  resourcesSchema,
  Resource
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export const storage = {
  // Save a search query to the database
  async saveSearch(search: {
    region: string;
    operatingSystem: string;
    budget: number;
    usageHours: number;
    resultsCount: number;
  }) {
    try {
      const parsedSearch = searchesSchema.parse({
        region: search.region,
        operating_system: search.operatingSystem,
        budget: search.budget,
        usage_hours: search.usageHours,
        results_count: search.resultsCount,
        created_at: new Date(),
      });
      
      const [newSearch] = await db.insert(searches).values(parsedSearch).returning();
      return newSearch;
    } catch (error) {
      console.error("Error saving search:", error);
      throw error;
    }
  },

  // Get all searches
  async getAllSearches() {
    try {
      const allSearches = await db.select().from(searches).orderBy(searches.created_at);
      return allSearches;
    } catch (error) {
      console.error("Error getting searches:", error);
      throw error;
    }
  },

  // Cache resource results by region and OS
  async cacheResults(region: string, operatingSystem: string, results: Resource[]) {
    try {
      // First delete existing cached resources for this region & OS combination
      await db.delete(resources)
        .where(
          and(
            eq(resources.region, region),
            eq(resources.operating_system, operatingSystem)
          )
        );
      
      // Insert new resources
      const parsedResults = results.map(resource => resourcesSchema.parse({
        ...resource,
        cached_at: new Date()
      }));
      
      await db.insert(resources).values(parsedResults);
      
      return true;
    } catch (error) {
      console.error("Error caching results:", error);
      throw error;
    }
  },

  // Get cached results by region and OS
  async getCachedResults(region: string, operatingSystem: string) {
    try {
      const cachedResults = await db.select()
        .from(resources)
        .where(
          and(
            eq(resources.region, region),
            eq(resources.operating_system, operatingSystem)
          )
        );
      
      // If we have cached results, return them
      if (cachedResults.length > 0) {
        return cachedResults;
      }
      
      // Otherwise return null
      return null;
    } catch (error) {
      console.error("Error getting cached results:", error);
      throw error;
    }
  }
};
