import { components, InsertExample, type Component, type InsertComponent } from "@shared/schema";

export interface IStorage {
  getComponents(): Promise<Component[]>;
  getComponentByName(name: string): Promise<Component | undefined>;
  getExamples(name: string): Promise<Component[]>;
}

export class MemStorage implements IStorage {
  private components: Map<number, Component>;
  private examples: Map<number, Component>;
  currentId: number;

  constructor() {
    this.components = new Map();
    this.examples = new Map();
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
  async getExamples(name: string): Promise<Component[]> {
    return Array.from(this.examples.values()).filter(
      (example) => example.name.toLowerCase() === name.toLowerCase()
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
          { name: "text", type: "string", description: "Text for the button" },
          { name: "btnDisabled", type: "boolean", description: "Disable the button" },
          { name: "plusIcon", type: "boolean", description: "Add a plus icon to the button or any other icon" },
        ],
        examples: [
          {
            id: "basic",
            name: "Basic",
            element: `<div class='flex gap-4'>
                          <primary-btn text='Primary'></primary-btn>
                          <secondary-btn text='Secondary'></secondary-btn>
                          <primary-no-border-btn text="Ghost" ></primary-no-border-btn>
                          <primary-btn text="Primary " btndisabled="true" ></primary-btn>
                          <primary-btn text="with icon" plusIcon="true"></primary-btn>
                      </div>`,
            code: '<primary-btn text="Primary Button" ></primary-btn>'
          },
          {
            id: "variants",
            name: "Variants",
            code: `<div className="flex gap-4">
    <primary-btn text="Primary Button" ></primary-btn>
    <primary-btn text="Primary Button" btndisabled="true" ></primary-btn>
    <secondary-btn text="Secondary Button" ></secondary-btn>
    <secondary-btn text="Secondary Button" btndisabled="true" ></secondary-btn>
    <primary-no-border-btn text="Primary No Border Button" ></primary-no-border-btn>
    <primary-no-border-btn text="Primary No Border Button" btndisabled="true" ></primary-no-border-btn>
</div>`
          },
          {
            id: "withIcons",
            name: "With Icons",
            code: `<div className="flex gap-4">
      <primary-btn text="Primary Button" plusIcon="true"></primary-btn>
      <primary-btn text="Primary Button" plusicon="true" btnDisabled = "true"></primary-btn>
</div>`
          }
        ]
      },
      {
        name: "Form Control",
        category: "Forms",
        description: "Displays a form input field ,checkbox and radio buttons with various states and styles.",
        usage: "Use input fields to collect user data in forms. Supports different types and states.",
        props: [
          { name: "readonly", type: "boolean", description: "Make the input field readonly" },
          { name: "inputId", type: "string", description: "Id for the input field" },
          { name: "name", type: "string", description: "Name for the input field" },
          { name: "type", type: "string", description: "Type of the input field" },
          { name: "placeholder", type: "string", description: "Placeholder for the input field" },
          { name: "labeltitle", type: "string", description: "Label title for checkbox or radio button" },
          { name: "labelfor", type: "string", description: "Label for checkbox or radio button" },
          { name: "checkboxdisabled", type: "boolean", description: "Disable the checkbox" },
          { name: "radioDisabled", type: "boolean", description: "Disable the radio button" },

        ],
        examples: [
          {
            id: "Input",
            name: "Input",
            code: `<upui-input label="Name" type="text" inputId="name" name="user[name]"placeholder="Enter your name"></upui-input>
<upui-input label="Email" type="email" inputId="email" name="user[email]" placeholder="Enter your email"></upui-input>
<upui-input label="Password" type="password" inputId="password" name="user[password]" placeholder="Enter your password"></upui-input>
<upui-input label="Date of Birth" type="date" inputId="dob"  name="user[dob]"></upui-input>
<upui-input label="Disabled Input" type="text" inputId="disabled" name="user[disabled]" readonly="true" placeholder="Enter your name"></upui-input>`,
            element: `
            <div class='flex gap-4'>
            <div class=''>
              <upui-input label="Name" type="text" inputId="name" name="user[name]"placeholder="Enter your name"></upui-input>
              <upui-input label="Email" type="email" inputId="email" name="user[email]" placeholder="Enter your email"></upui-input>
              <upui-input label="Password" type="password" inputId="password" name="user[password]" placeholder="Enter your password"></upui-input>
              <upui-input label="Date of Birth" type="date" inputId="dob"  name="user[dob]"></upui-input>
              <upui-input label="Disabled Input" type="text" inputId="disabled" name="user[disabled]" readonly="true" placeholder="Enter your name"></upui-input>
            </div>
              <div class=''>
              <checkbox-input labeltitle="Checkbox" labelfor="Checkbox Input"></checkbox-input>
              <checkbox-input labeltitle="Disabled Checkbox" labelfor="Checkbox Input" checkboxdisabled = "true"></checkbox-input>
                </div>
              <div class=''>
              <radio-input labeltitle="Radio" labelfor="Radio Input"></radio-input>
              <radio-input labeltitle="Disabled Radio" labelfor="Radio Input" radioDisabled = "true"></radio-input>
              </div>
            </div>
            `
          },
          {
            id: "Checkbox",
            name: "Checkbox",
            code: `<checkbox-input labeltitle="Checkbox" labelfor="Checkbox Input"></checkbox-input>
<checkbox-input labeltitle="Checkbox" labelfor="Checkbox Input" checkboxdisabled = "true"></checkbox-input>
              `
          },
          {
            id: "Radio",
            name: "Radio",
            code: `<radio-input labeltitle="Radio" labelfor="Radio Input"></radio-input>
<radio-input labeltitle="Radio" labelfor="Radio Input" radioDisabled = "true"></radio-input>
            `
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
            id: "basic",
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
            id: "basic",
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
            id: "basic",
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
    const examples: InsertExample[] = [
      {
        name: "RCS Component",
        category: "Forms",
        description: "A clickable button component with various styles and states.",
      }
    ];

    components.forEach((component) => {
      this.components.set(this.currentId, { id: this.currentId, ...component } as Component);
      this.currentId++;
    });
    examples.forEach((example) => {
      this.examples.set(this.currentId, { id: this.currentId, ...example } as Component);
      this.currentId++;
    });
  }
}

export const storage = new MemStorage();