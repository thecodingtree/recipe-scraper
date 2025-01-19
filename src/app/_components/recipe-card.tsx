import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Recipe } from "@/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{recipe.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Ingredients</h3>
            <ul className="list-disc space-y-1 pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Instructions</h3>
            <ol className="list-decimal space-y-2 pl-5">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          {JSON.stringify(recipe.nutrition)}
        </div>
      </CardContent>
    </Card>
  );
}
