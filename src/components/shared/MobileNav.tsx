import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import menu from "@/assets/menu.svg";
import logo from "@/assets/logo.png";
import { Separator } from "@radix-ui/react-separator";
import Navitems from "./Navitems";

export default function MobileNav() {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src={menu}
            alt="Menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3 border-b-2 py-3">
              <Image src={logo} width={40} height={40} alt="Event Logo" />
              <span className="text-2xl font-bold tracking-tight">EventOr</span>
            </SheetTitle>
          </SheetHeader>
          
          <Navitems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
