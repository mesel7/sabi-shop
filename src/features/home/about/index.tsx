import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/shared/ui/button/ButtonLink";

export default async function About() {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
        <h2 id="about-title" className="text-xl md:text-2xl font-semibold mb-4">
          {t("about.title")}
        </h2>

        <p className="tracking-wider leading-8">{t("about.body1")}</p>
        <p className="mb-4 tracking-wider leading-8">{t("about.body2")}</p>
        {/* next-intl Link가 locale prefix 자동 */}
        <ButtonLink
          href="/products"
          variant="primary"
          className="w-full md:w-auto"
        >
          {t("cta.shop")}
        </ButtonLink>
      </div>
    </section>
  );
}
