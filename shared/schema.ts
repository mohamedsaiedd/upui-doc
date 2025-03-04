import { pgTable, text, serial, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const components = pgTable("components", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  usage: text("usage").notNull(),
  props: json("props").notNull().$type<Array<{name: string, type: string, description: string}>>(),
  examples: json("examples").notNull().$type<Array<{name: string, code: string, element?: string,id:string}>>()
});

export const examples = pgTable("examples", {
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
});

export const insertComponentSchema = createInsertSchema(components).pick({
  name: true,
  description: true,
  category: true,
  usage: true,
  props: true,
  examples: true
});

export const insertExampleSchema = createInsertSchema(examples).pick({
  name: true,
  description: true,  
  category: true,
});
export type InsertComponent = z.infer<typeof insertComponentSchema>;
export type Component = typeof components.$inferSelect;
export type InsertExample = z.infer<typeof insertExampleSchema>;
export type Example = typeof examples.$inferSelect;
