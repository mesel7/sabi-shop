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
          <Button href={`/${locale}/products`} variant="primary">
            {t("cta.shop")}
          </Button>
        </div>
      </section>

      {/* Seasonal Beans */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="relative flex items-center justify-center">
          <h2 className="text-xl md:text-2xl font-semibold font-outfit">
            {t("featured.title")}
          </h2>
          <Link
            href={`/${locale}/products`}
            className="absolute right-0 text-sm text-gray-500 hover:text-[color:var(--color-foreground)] transition-colors duration-300"
          >
            {t("featured.more")}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <SeasonalBeans />
        </div>
      </section>

      {/* WHAT'S BREWING */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-semibold font-outfit text-center">
          {t("brewing.title")}
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <FeaturedStories />
        </div>
      </section>
    </main>
  );
}
