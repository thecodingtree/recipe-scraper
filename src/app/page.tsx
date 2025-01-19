"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

//import { HydrateClient } from "@/trpc/server";

import type { Recipe } from "@/types";

import RecipeCard from "./_components/recipe-card";
import { RecipeUrlInput } from "@/components/RecipeUrlInput";

export default function Home() {
  const testRecipe = {
    name: "Test Recipe",
    ingredients: [
      { name: "Salt", amount: "1tsp" },
      { name: "Pepper", amount: "1tsp" },
    ],
    steps: ["Mix the salt", "Mix the pepper", "That's it!"],
  } satisfies Recipe;

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const getHtml = api.scraper.getRecipeHtml.useMutation();
  const getRecipeData = api.scraper.getRecipeData.useMutation();

  const handleSubmit = (url: string) => {
    getHtml.mutate(
      { url },
      {
        onSuccess: (data) => {
          console.log("data", data);
          if (data) {
            getRecipeData.mutate({ html: data }, { onSuccess: setRecipe });
          }
        },
      },
    );
  };

  return (
    // <HydrateClient>
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Recipe Scraper
        </h1>
        <div className="flex min-w-full flex-1 flex-col items-center gap-2">
          <RecipeUrlInput onSubmit={handleSubmit} />
        </div>
        <div className="flex min-w-full flex-1 flex-col items-center gap-2">
          {recipe && <RecipeCard recipe={recipe} />}
        </div>
      </div>
    </main>
    // </HydrateClient>
  );
}
