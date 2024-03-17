import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  const yearBuilt = "2024";
  const isTheSameYearBuilt = yearBuilt === new Date().getFullYear().toString();
  const copyRightYear = yearBuilt + " - " + new Date().getFullYear().toString();

  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between m-auto flex max-w-5xl flex-col gap-4 p-5 text-center sm:flex-row">
        <Link className="flex items-center gap-3" href="/">
          <Image src={logo} width={40} height={40} alt="Event Logo" />
          <span className="text-2xl font-bold tracking-tight">EventOr</span>
        </Link>

        <div className="text-center text-sm text-muted-foreground">
          © {`${isTheSameYearBuilt ? yearBuilt : copyRightYear}`} AI-Tech
          Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
