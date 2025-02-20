import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Search from "@/components/search";
import { useState } from "react";
import type { Component } from "@shared/schema";

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
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Components</h1>
        <Search value={search} onChange={setSearch} />
      </div>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents
              .filter(c => c.category === category)
              .map(component => (
                <Link key={component.id} href={`/components/${component.name.toLowerCase()}`}>
                  <Card className="cursor-pointer hover:border-primary transition-colors">
                    <CardHeader>
                      <CardTitle>{component.name}</CardTitle>
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
  );
}
