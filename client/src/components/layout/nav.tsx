import { Link } from "wouter";

export default function Nav() {
  return (
    <nav className="hidden md:flex gap-6">
      <Link href="/components">
        <a className="text-sm font-medium hover:text-primary">Components</a>
      </Link>
      <Link href="/examples/rcs">
        <a className="text-sm font-medium hover:text-primary">Examples</a>
      </Link>
    </nav>
  );
}
