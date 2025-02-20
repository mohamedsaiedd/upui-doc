import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ComponentPreviewProps {
  title: string;
  code: string;
}

export default function ComponentPreview({ title, code }: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b bg-muted flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyCode}
          className="h-8 px-2"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        {/* Component preview would go here */}
      </div>
      <pre className="p-4 bg-muted border-t overflow-x-auto">
        <code>{code}</code>
      </pre>
    </Card>
  );
}
