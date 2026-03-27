import { pgTable, text, serial, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lotsTable = pgTable("lots", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  country: text("country").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  currency: text("currency").notNull().default("USD"),
  timeline: text("timeline").notNull(),
  features: json("features").$type<string[]>().notNull().default([]),
  logoUrl: text("logo_url"),
  available: boolean("available").notNull().default(true),
});

export const insertLotSchema = createInsertSchema(lotsTable).omit({ id: true });
export type InsertLot = z.infer<typeof insertLotSchema>;
export type Lot = typeof lotsTable.$inferSelect;
