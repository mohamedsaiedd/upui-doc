import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="text-xl font-bold">UI Docs</a>
          </Link>
          <Nav />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            GitHub
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
