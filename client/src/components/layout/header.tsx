import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Nav from "./nav";
import Img from "./upui.png";
import Img1 from "./logoyb.png";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
          <img className="logo" src={Img}></img>
          </Link>
          <Nav />
        </div>
        <div className="flex items-center gap-4">
          {/* <img className="logo" src="https://uplandsoftware.com/wp-content/uploads/upland-software-logo.png"></img> */}
        </div>
      </div>
    </header>
  );
}
