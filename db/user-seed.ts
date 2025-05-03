import { db } from "./index";
import { users } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq } from "drizzle-orm/expressions";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seedUser() {
  try {
    // Check if a test user already exists
    const existingUser = await db.select().from(users).where(({ username }) => eq(username, "demo"));
    
    if (existingUser.length > 0) {
      console.log("Test user already exists, skipping...");
      return;
    }
    
    console.log("Creating test user...");
    
    // Create a test user
    const hashedPassword = await hashPassword("password123");
    
    await db.insert(users).values({
      username: "demo",
      password: hashedPassword
    });
    
    console.log("Test user created successfully!");
  } catch (error) {
    console.error("Error creating test user:", error);
  }
}

seedUser();