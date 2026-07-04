import { useEffect, useState } from "react";
import { Story } from "@/types/story";

export function useStoryCarousel(stories: Story[]) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stories.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [stories]);

  const next = () => setCurrent((prev) => (prev + 1) % stories.length);

  const previous = () =>
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));

  return {
    current,
    currentStory: stories[current],
    next,
    previous,
  };
}
