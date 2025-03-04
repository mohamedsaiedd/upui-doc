import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-[900] tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          Upland UI Components
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A collection of modern, accessible and customizable UI components built with React and Tailwind CSS.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/components">
            <Button className="up-priamry" size="lg">Browse Components</Button>
          </Link>
          <Button variant="outline" size="lg">
            View on GitHub
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols gap-8 mt-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Getting Started</h2>
          <p className="text-muted-foreground">
            Install the dependencies and start using our components in your React application.
          </p>
          <pre className="p-4 bg-muted rounded-lg">
            npm install uplandui@latest
          </pre>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage</h2>
          <p className="text-muted-foreground">
            Import and use components directly in your React code.
          </p>
          <pre className="p-4 bg-muted rounded-lg">
            {`import { defineCustomElements } from 'uplandui/loader'
defineCustomElements();
            
export default function App() {
  return <primary-btn text="Primary Button" ></primary-btn>
}`}
          </pre>
        </div>
      </div>
      <div className="grid md:grid-cols gap-8 mt-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Native Javascipt enviroment</h2>
          <p className="text-muted-foreground">
           use the following script to include the components in your project.
          </p>
          <pre className="p-4 bg-muted rounded-lg">
            {`<script type="module"> import uplandui from https://cdn.jsdelivr.net/npm/uplandui@0.3.4/+esm </script>`}
          </pre>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage</h2>
          <p className="text-muted-foreground">
            Import and use components directly in your React code.
          </p>
          <pre className="p-4 bg-muted rounded-lg">
            {`<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <script type="module"> import uplandui from https://cdn.jsdelivr.net/npm/uplandui@0.3.4/+esm </script>
</head> 
  <body>
    <primary-btn text="Primary Button" ></primary-btn>
  </body>
</html>
            `}
          </pre>
        </div>
      </div>
    </div>
  );
}
