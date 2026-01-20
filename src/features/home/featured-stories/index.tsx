import { getLocale, getTranslations } from "next-intl/server";
import StoryCard from "@/features/home/featured-stories/StoryCard";
import { STORIES } from "@/site/stories.mock";

export default async function FeaturedStories() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as "ko" | "ja";
  const stories = STORIES.slice(0, 4);

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16"
      aria-labelledby="featured-stories-title"
    >
      <h2
        id="featured-stories-title"
        className="text-2xl font-semibold font-outfit text-center"
      >
        {t("brewing.title")}
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stories.map((s) => (
          <StoryCard key={s.id} s={s} locale={locale} />
        ))}
      </div>
    </section>
  );
}
