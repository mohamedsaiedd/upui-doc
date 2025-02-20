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
      (component) => component.name.toLowerCase() === name.toLowerCase()
    );
  }

  private seedData() {
    const components: InsertComponent[] = [
      {
        name: "Button",
        category: "Forms",
        description: "A clickable button component with various styles and states.",
        usage: "Use buttons to trigger actions or submit forms. Choose from multiple variants and sizes to match your design needs.",
        props: [
          { name: "variant", type: "string", description: "Visual style - default, destructive, outline, secondary, ghost, link" },
          { name: "size", type: "string", description: "Button size - default, sm, lg, icon" },
          { name: "asChild", type: "boolean", description: "Change the component to the HTML tag or custom component supplied" }
        ],
        examples: [
          {
            name: "Basic",
            code: '<Button>Click me</Button>'
          },
          {
            name: "Variants",
            code: `<div className="flex gap-4">
  <Button variant="default">Default</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`
          }
        ]
      },
      {
        name: "Input",
        category: "Forms",
        description: "Displays a form input field with various states and styles.",
        usage: "Use input fields to collect user data in forms. Supports different types and states.",
        props: [
          { name: "type", type: "string", description: "HTML input type - text, password, email, etc." },
          { name: "placeholder", type: "string", description: "Placeholder text" },
          { name: "disabled", type: "boolean", description: "Disable the input" }
        ],
        examples: [
          {
            name: "Basic",
            code: '<Input type="text" placeholder="Enter your name" />'
          },
          {
            name: "Disabled",
            code: '<Input disabled type="text" placeholder="Disabled input" />'
          }
        ]
      },
      {
        name: "Dialog",
        category: "Overlays",
        description: "A modal dialog that interrupts the user with important content.",
        usage: "Use dialogs to display important information or gather user input without leaving the current context.",
        props: [
          { name: "open", type: "boolean", description: "Control the open state" },
          { name: "onOpenChange", type: "function", description: "Called when open state changes" }
        ],
        examples: [
          {
            name: "Basic",
            code: `<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
          }
        ]
      },
      {
        name: "Select",
        category: "Forms",
        description: "Displays a dropdown list of options for users to pick from.",
        usage: "Use select when you want users to pick from a predefined list of options.",
        props: [
          { name: "defaultValue", type: "string", description: "The default selected value" },
          { name: "onValueChange", type: "function", description: "Called when the value changes" }
        ],
        examples: [
          {
            name: "Basic",
            code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`
          }
        ]
      },
      {
        name: "Card",
        category: "Layout",
        description: "A container component for grouping related content.",
        usage: "Use cards to group related information and actions. Perfect for displaying content in a grid or list.",
        props: [
          { name: "className", type: "string", description: "Additional CSS classes" },
          { name: "asChild", type: "boolean", description: "Change the component to the HTML tag or custom component supplied" }
        ],
        examples: [
          {
            name: "Basic",
            code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`
          }
        ]
      }
    ];

    components.forEach((component) => {
      this.components.set(this.currentId, { id: this.currentId, ...component });
      this.currentId++;
    });
  }
}

export const storage = new MemStorage();