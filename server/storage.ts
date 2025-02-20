import { components, type Component, type InsertComponent } from "@shared/schema";

export interface IStorage {
  getComponents(): Promise<Component[]>;
  getComponentByName(name: string): Promise<Component | undefined>;
}

export class MemStorage implements IStorage {
  private components: Map<number, Component>;
  currentId: number;

  constructor() {
    this.components = new Map();
    this.currentId = 1;
    this.seedData();
  }

  async getComponents(): Promise<Component[]> {
    return Array.from(this.components.values());
  }

  async getComponentByName(name: string): Promise<Component | undefined> {
    return Array.from(this.components.values()).find(
      (component) => component.name === name
    );
  }

  private seedData() {
    const buttonComponent: InsertComponent = {
      name: "Button",
      category: "Forms",
      description: "A clickable button component with various styles and states.",
      usage: "Use buttons to trigger actions or submit forms.",
      props: [
        { name: "variant", type: "string", description: "Visual style - default, outline, ghost" },
        { name: "size", type: "string", description: "Button size - sm, md, lg" }
      ],
      examples: [
        {
          name: "Basic",
          code: '<Button>Click me</Button>'
        },
        {
          name: "Outline",
          code: '<Button variant="outline">Outline</Button>'
        }
      ]
    };

    this.components.set(this.currentId++, { id: 1, ...buttonComponent });
  }
}

export const storage = new MemStorage();
