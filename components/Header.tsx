"use client";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex items-center">
      <div className="main-container inner">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="CoinPulse logo"
            width={132}
            height={40}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <nav>
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={cn("nav-link", {
              "is-active": pathname === "/",
              "is-home": pathname === "/",
            })}
          >
            Home
          </Link>
          <p>Search Modal</p>
          <Link
            href="/coins"
            aria-current={pathname === "/coins" ? "page" : undefined}
            className={cn("nav-link", {
              "is-active": pathname === "/coins",
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
