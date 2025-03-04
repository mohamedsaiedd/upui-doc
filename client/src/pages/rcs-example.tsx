import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentPreview from "@/components/component-preview";
import type {  Example } from "@shared/schema";
import DocsLayout from "@/components/layout/docs-layout";
import ComponentsNav from "@/components/layout/components-nav";
import ExamplesNav from "@/components/layout/examples-nav";

export default function RcsExample() {
  const { name } = useParams();
  const { data: example } = useQuery<Example>({
    queryKey: [`/api/examples/${name}`]
  });

  if (!example) return null;


  return (
    <DocsLayout sidebar={<ExamplesNav />}>
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Rcs Component</h1>
          <p className="text-lg text-muted-foreground">this is a RCS component example combined with some other components like input and button</p>
          <p className="text-lg text-muted-foreground flex gap-8 py-5">
            <primary-btn text="Primary Button" ></primary-btn>
            <secondary-btn text="Secondary Button" ></secondary-btn>
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}