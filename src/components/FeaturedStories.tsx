"use client";

import { STORIES } from "@/site/stories.mock";
import StoryCard from "@/components/StoryCard";

export default function FeaturedStories() {
  const stories = STORIES.slice(0, 4);
  return (
    <>
      {stories.map((s) => (
        <StoryCard key={s.id} s={s} />
      ))}
    </>
  );
}
