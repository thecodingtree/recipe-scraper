"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

import type { Recipe } from "@/types";

import { showToastMsg } from "@/utils";

import RecipeCard from "@/app/_components/recipe-card";
import { RecipeUrlInput } from "@/app/_components/recipe-url-input";

import { NutritionalFactsLabel } from "@/app/_components/nutrition-facts-label";

import { RecipeLoader } from "@/app/_components/recipe-loader";

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  const getHtml = api.scraper.getRecipeHtml.useMutation();
  const getRecipeData = api.scraper.getRecipeData.useMutation();

  const handleSubmit = (url: string) => {
    setLoading(true);
    getHtml.mutate(
      { url },
      {
        onSuccess: (data) => {
          if (data) {
            getRecipeData.mutate(
              { html: data },
              {
                onSuccess: setRecipe,
                onError: (err) => {
                  setRecipe(null);
                  showToastMsg(
                    "Whoops! Unable to get recipe",
                    "So sorry! Please try again later...",
                  );
                  console.log("Unable to get recipe data", err);
                },
                onSettled: () => setLoading(false),
              },
            );
          } else {
            setLoading(false);
          }
        },
        onError: () => {
          setRecipe(null);
          setLoading(false);
          showToastMsg(
            "Whoops! Unable to get recipe",
            "So sorry! Please try again later...",
          );
        },
      },
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
          Recipe Scraper
        </h1>
        <div className="flex min-w-full flex-1 flex-col items-center gap-2">
          <RecipeUrlInput onSubmit={handleSubmit} />
        </div>
        <div className="flex min-w-full flex-row">
          <div className="flex flex-1 flex-col items-center gap-2">
            {loading ? (
              <RecipeLoader />
            ) : (
              recipe && (
                <div className="flex w-full flex-row gap-2">
                  <div className="flex-1">
                    <RecipeCard recipe={recipe} />
                  </div>
                  <div>
                    <NutritionalFactsLabel nutrition={recipe?.nutrition} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
