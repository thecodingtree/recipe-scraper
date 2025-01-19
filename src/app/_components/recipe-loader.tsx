"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const bakingPhrases = [
  "Whisking up some magic...",
  "Folding in the fun...",
  "Preheating the creativity oven...",
  "Measuring a cup of patience...",
  "Sifting through ideas...",
  "Kneading the perfect solution...",
  "Letting the inspiration rise...",
  "Sprinkling in some whimsy...",
  "Baking up a storm of brilliance...",
  "Glazing over the details...",
];

export function RecipeLoader() {
  const [phraseIndex, setPhraseIndex] = useState(
    Math.floor(Math.random() * bakingPhrases.length),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % bakingPhrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto min-w-full rounded-lg bg-white p-6 shadow-md">
      <Skeleton className="mb-4 h-8 w-3/4" />

      <div className="mb-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="mt-6 text-center">
        <p className="text-primary animate-pulse text-lg font-medium">
          {bakingPhrases[phraseIndex]}
        </p>
      </div>
    </div>
  );
}
