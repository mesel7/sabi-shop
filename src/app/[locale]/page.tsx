"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import HeroSwiper from "@/components/HeroSwiper";
import { Button } from "@/components/Button";
import SeasonalBeans from "@/components/SeasonalBeans";
import FeaturedStories from "@/components/FeaturedStories";

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale() as "ko" | "ja";

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <HeroSwiper />

      {/* ABOUT */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            {t("about.title")}
          </h2>
          <p className="tracking-wider leading-8">{t("about.body1")}</p>
          <p className="mb-4 tracking-wider leading-8">{t("about.body2")}</p>
          <Button
            href={`/${locale}/products`}
            variant="primary"
            className="w-full md:w-auto"
          >
            {t("cta.shop")}
          </Button>
        </div>
      </section>

      {/* Seasonal Beans */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div
          className="
        flex flex-col items-center text-center
        md:flex-row md:items-center md:justify-between md:text-left
      "
        >
          <h2 className="text-2xl font-semibold font-outfit mb-2 md:mb-0">
            {t("featured.title")}
          </h2>

          <Link
            href={`/${locale}/products`}
            className="text-sm text-gray-500 hover:text-[color:var(--color-foreground)] transition-colors duration-300"
          >
            {t("featured.more")}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <SeasonalBeans />
        </div>
      </section>

      {/* WHAT'S BREWING */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl font-semibold font-outfit text-center">
          {t("brewing.title")}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <FeaturedStories />
        </div>
      </section>
    </main>
  );
}
