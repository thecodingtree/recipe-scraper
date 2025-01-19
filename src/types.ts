import type { z } from "zod";

import type { recipe, ingredient, nutritionValue, nutrition } from "@/schemas";

export type Recipe = z.infer<typeof recipe>;

export type Ingredient = z.infer<typeof ingredient>;

export type NutritionValue = z.infer<typeof nutritionValue>;
export type Nutrition = z.infer<typeof nutrition>;
