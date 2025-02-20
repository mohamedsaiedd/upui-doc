import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentPreview from "@/components/component-preview";
import type { Component } from "@shared/schema";

export default function ComponentPage() {
  const { name } = useParams();
  const { data: component } = useQuery<Component>({
    queryKey: [`/api/components/${name}`]
  });

  if (!component) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
      <p className="text-lg text-muted-foreground mb-8">{component.description}</p>

      <Tabs defaultValue="examples" className="space-y-4">
        <TabsList>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="examples" className="space-y-8">
          {component.examples.map((example, i) => (
            <ComponentPreview 
              key={i}
              title={example.name}
              code={example.code}
            />
          ))}
        </TabsContent>

        <TabsContent value="api">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Props</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop, i) => (
                  <tr key={i}>
                    <td><code>{prop.name}</code></td>
                    <td><code>{prop.type}</code></td>
                    <td>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>{component.usage}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
