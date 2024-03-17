"use client";

import { menuLinks } from "@/lib/menu-links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navitems() {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {menuLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-blue-500 font-semibold underline"
            } flex-center whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
