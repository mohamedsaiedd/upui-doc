import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import type { Component } from "@shared/schema";
import { useEffect, useState } from "react";

export default function ExamplesNav() { 
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
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">All Examples</h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          
        </div>
      </div>

        <div className="space-y-4">
        <Link href="/examples/rcs">
            <a className={cn(
              "flex w-full items-center rounded-md px-2 py-1 hover:bg-muted",
              location === "/examples/rcs" 
                ? "bg-muted font-medium text-primary"
                : "text-muted-foreground"
            )}>
              RCS
            </a>
          </Link>
        </div>
    </div>
  );
}