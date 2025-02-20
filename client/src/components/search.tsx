import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        placeholder="Search components..."
      />
    </div>
  );
}
