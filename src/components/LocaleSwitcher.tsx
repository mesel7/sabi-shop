"use client";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
  const other = locale === "ko" ? "ja" : "ko";

  const cleaned = pathname.replace(/^\/(ko|ja)(?=\/|$)/, "") || "/";

  const target = `/${other}${cleaned}`;

  return (
    <Link
      href={target}
      className="text-sm font-outfit hover:opacity-50 transition-opacity duration-300"
    >
      {other.toUpperCase()}
    </Link>
  );
}
