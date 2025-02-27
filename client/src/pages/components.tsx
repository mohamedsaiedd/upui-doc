import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Search from "@/components/search";
import { useState } from "react";
import type { Component } from "@shared/schema";
import DocsLayout from "@/components/layout/docs-layout";
import ComponentsNav from "@/components/layout/components-nav";

export default function Components() {
  const [search, setSearch] = useState("");
  const { data: components = [] } = useQuery<Component[]>({ 
    queryKey: ['/api/components']
  });

  const filteredComponents = components.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(components.map(c => c.category)));

  return (
    <DocsLayout sidebar={<ComponentsNav />}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Components</h1>
          <p className="text-lg text-muted-foreground">
            A collection of pre-built components ready to use in your projects.
          </p>
          <Search value={search} onChange={setSearch} />
        </div>

        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComponents
                .filter(c => c.category === category)
                .map(component => (
                  <Link key={component.id} href={`/components/${component.name.toLowerCase()}`}>
                    <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">{component.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {component.description}
                        </p>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
}