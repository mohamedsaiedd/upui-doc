import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Search from "@/components/search";
import { useState } from "react";
import type { Component } from "@shared/schema";
import DocsLayout from "@/components/layout/docs-layout";
import ExamplesNav from "@/components/layout/examples-nav";

export default function Examples() {
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
    <DocsLayout sidebar={<ExamplesNav />}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Examples</h1>
          <p className="text-lg text-muted-foreground">
            A collection of pre-built components ready to use in your projects.
          </p>
          <Search value={search} onChange={setSearch} />
        </div>

        {categories.map(category => (
            <div key={category} className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredComponents.filter(c => c.category === category).map(component => (
                        <div key={component.id}>{component.name}</div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </DocsLayout>
  );
}