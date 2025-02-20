import type { Component } from "@shared/schema";

export const componentCategories = [
  "Forms",
  "Layout",
  "Navigation",
  "Feedback",
  "Data Display",
  "Overlays"
];

export function getComponentCategory(component: Component): string {
  return component.category;
}
