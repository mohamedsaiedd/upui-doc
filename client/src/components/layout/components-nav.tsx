import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import type { Component } from "@shared/schema";
import { useEffect, useState } from "react";

export default function ComponentsNav() {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const { data: components = [] } = useQuery<Component[]>({ 
    queryKey: ['/api/components']
  });

  const categories = Array.from(new Set(components.map(c => c.category)));

  // Handle scroll highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all section elements
    document.querySelectorAll('[data-section]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-1">
      <div>
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">Overview</h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          <Link href="/components">
            <a className={cn(
              "flex w-full items-center rounded-md px-2 py-1 hover:bg-muted",
              location === "/components" 
                ? "bg-muted font-medium text-primary"
                : "text-muted-foreground"
            )}>
              All Components
            </a>
          </Link>
        </div>
      </div>

      {categories.map(category => (
        <div key={category}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">{category}</h4>
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {components
              .filter(c => c.category === category)
              .map(component => {
                const componentPath = `/components/${component.name.toLowerCase()}`;
                const isActive = location === componentPath;

                return (
                  <div key={component.id} className="flex flex-col">
                    <Link href={componentPath}>
                      <a className={cn(
                        "flex w-full items-center rounded-md px-2 py-1 hover:bg-muted",
                        isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground"
                      )}>
                        {component.name}
                      </a>
                    </Link>
                    {isActive && (
                      <div className="ml-4 border-l border-muted">
                        {component.examples?.map((example) => {
                          const sectionId = example.name.toLowerCase();
                          return (
                            <a
                              key={sectionId}
                              href={`#${sectionId}`}
                              className={cn(
                                "flex w-full items-center rounded-md px-2 py-1 hover:bg-muted transition-colors",
                                activeSection === sectionId
                                  ? "bg-muted font-medium text-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(sectionId)?.scrollIntoView({
                                  behavior: 'smooth'
                                });
                                setActiveSection(sectionId);
                              }}
                            >
                              {example.name}
                            </a>
                          );
                        })}
                        
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}