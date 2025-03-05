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
     
    </DocsLayout>
  );
}