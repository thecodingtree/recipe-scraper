import { openai } from "@ai-sdk/openai";

import { generateObject } from "ai";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { getRecipeHtmlFromUrl } from "@/server/recipe-scraper";

import { recipe } from "@/schemas";

export const scraperRouter = createTRPCRouter({
  getRecipeHtml: publicProcedure
    .input(z.object({ url: z.string(), plugin: z.string().optional() }))
    .mutation(async ({ input }) => {
      return await getRecipeHtmlFromUrl(input.url, input?.plugin);
    }),
  getRecipeData: publicProcedure
    .input(z.object({ html: z.string() }))
    .mutation(async ({ input }) => {
      const result = await generateObject({
        model: openai("gpt-4o-mini", {
          structuredOutputs: true,
        }),
        schemaName: "scrapped-recipe",
        schemaDescription: "a scrapped recipe",
        schema: recipe,
        system:
          "I am going to give you html from a recipe website and you need to generate a recipe object from it. You will also generate the nutrition facts based on the ingredients in the recipe and suggest serving sizes. If you can find the servering size look to historical data and make a guess. For each of nutrition items also include what percent of the daily recommended amount it is as a number",
        prompt: input.html,
      });

      return result.object;
    }),
});
