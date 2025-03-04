import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentPreview from "@/components/component-preview";
import type { Component } from "@shared/schema";
import DocsLayout from "@/components/layout/docs-layout";
import ComponentsNav from "@/components/layout/components-nav";

export default function ComponentPage() {
  const { name } = useParams();
  const { data: component } = useQuery<Component>({
    queryKey: [`/api/components/${name}`]
  });

  if (!component) return null;

  return (
    <DocsLayout sidebar={<ComponentsNav />}>
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{component.name}</h1>
          <p className="text-lg text-muted-foreground">{component.description}</p>
          <p className="text-lg text-muted-foreground flex gap-8 py-5">
          {component.examples.map((example, i) => (
              <div key={i} data-section={example.name.toLowerCase()} className="flex gap-4">
                <div dangerouslySetInnerHTML={{ __html: example.element || "" }} />
              </div>
            ))}
          </p>
        </div>
        <Tabs defaultValue="examples" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="api">Props</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-8">
            {component.examples.map((example, i) => (
              <div key={i} data-section={example.name.toLowerCase()}>
                <ComponentPreview 
                  title={example.name}
                  code={example.code}
                  element={example.element}
                  id={example.name.toLowerCase()}
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="api">
            <div data-section="api" id="api" className="prose prose-gray dark:prose-invert max-w-none">
              <h2>Props</h2>
              <div className="my-6 w-full overflow-y-auto">
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
            </div>
          </TabsContent>

          <TabsContent value="usage">
            <div data-section="usage" className="prose prose-gray dark:prose-invert max-w-none">
              <p>{component.usage}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DocsLayout>
  );
}