import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ComponentPreviewProps {
  title: string;
  code: string;
  element: string;
  id?: string;
}

export default function ComponentPreview({ title, code, element, id }: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card id={id} className="overflow-hidden border-2 scroll-mt-20">
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
        <div className="font-mono text-sm text-muted-foreground">
          {title}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyCode}
          className="h-6 w-6"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-6 flex min-h-[120px] w-full items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">
          <div dangerouslySetInnerHTML={{ __html: element }} />
        </div>
      </div>
      <div className="relative">
        <pre className="overflow-x-auto border-t bg-muted py-4 px-6">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {code}
          </code>
        </pre>
      </div>
    </Card>
  );
}