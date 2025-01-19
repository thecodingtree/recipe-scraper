import { z } from "zod";

export const ingredient = z.object({
  name: z.string(),
  amount: z.string(),
});

export const nutritionValue = z.object({
  unit: z.string(),
  value: z.number(),
  dailyPercent: z.number(),
});
export const nutrition = z.object({
  servingSize: z.string(),
  calories: nutritionValue,
  fat: nutritionValue,
  saturatedFat: nutritionValue,
  transFat: nutritionValue,
  cholesterol: nutritionValue,
  sodium: nutritionValue,
  carboydrate: nutritionValue,
  dietaryFiber: nutritionValue,
  sugar: nutritionValue,
  protein: nutritionValue,
});

export const recipe = z.object({
  name: z.string(),
  ingredients: z.array(ingredient),
  steps: z.array(z.string()),
  nutrition: nutrition,
});
