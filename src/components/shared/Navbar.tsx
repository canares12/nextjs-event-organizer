import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navitems from "./Navitems";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="wrapper m-auto flex max-w-5xl items-center justify-between gap-4 p-5">
        <Link className="flex items-center gap-3" href="/">
          <Image src={logo} width={40} height={40} alt="Event Logo" />
          <span className="text-2xl font-bold tracking-tight">EventOr</span>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <Navitems />
          </nav>
        </SignedIn>

        <div className="flex gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-lg" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
