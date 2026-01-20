import About from "@/features/home/about";
import FeaturedStories from "@/features/home/featured-stories";
import Hero from "@/features/home/hero";
import SeasonalBeans from "@/features/home/seasonal-beans";

export default function Home() {
  return (
    <main className="flex-1 pt-16">
      <Hero />
      <About />
      <SeasonalBeans />
      <FeaturedStories />
    </main>
  );
}
