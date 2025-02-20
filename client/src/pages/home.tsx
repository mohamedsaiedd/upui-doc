import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
          Beautiful UI Components
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A collection of modern, accessible and customizable UI components built with React and Tailwind CSS.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/components">
            <Button size="lg">Browse Components</Button>
          </Link>
          <Button variant="outline" size="lg">
            View on GitHub
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          <p className="text-muted-foreground">
            Install the dependencies and start using our components in your React application.
          </p>
          <pre className="p-4 bg-muted rounded-lg">
            npm install @ui/components
          </pre>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage</h2>
          <p className="text-muted-foreground">
            Import and use components directly in your React code.
          </p>
          <pre className="p-4 bg-muted rounded-lg">
            {`import { Button } from "@ui/components"
            
export default function App() {
  return <Button>Click me</Button>
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
