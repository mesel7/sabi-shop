import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="text-gray-500 mt-2">
        Next.js + TS + Redux + Tailwind + i18n
      </p>
    </section>
  );
}
