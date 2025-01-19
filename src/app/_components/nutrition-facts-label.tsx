import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import type { Nutrition } from "@/types";

export const nutritionFacts = {
  servingSize: "Serving size 2/3 cup (55g)",
  servingsPerContainer: "Servings per container about 8",
  calories: 230,
};

const NutritionFactRow: React.FC<{
  name: string;
  amount: string;
  dailyValue?: string;
  boldName?: boolean;
}> = ({ name, amount, dailyValue, boldName }) => (
  <div className="flex justify-between border-t border-black py-1 text-sm">
    <span className={boldName ? "font-bold" : ""}>{name}</span>
    <div className="flex">
      <span className="mr-4 font-bold">{amount}</span>
      {dailyValue && <span className="font-bold">{dailyValue}%</span>}
    </div>
  </div>
);

export function NutritionalFactsLabel({
  nutrition,
}: {
  nutrition?: Nutrition;
}) {
  if (!nutrition) {
    return;
  }

  const facts = [
    { name: "Total Fat", data: nutrition.fat, boldName: true },
    { name: "Saturated Fat", data: nutrition.saturatedFat },
    { name: "Trans Fat", data: nutrition.transFat },
    { name: "Cholesterol", data: nutrition.cholesterol, boldName: true },
    { name: "Sodium", data: nutrition.sodium, boldName: true },
    {
      name: "Total Carbohydrate",
      data: nutrition.carboydrate,
      boldName: true,
    },
    { name: "Dietary Fiber", data: nutrition.dietaryFiber },
    { name: "Total Sugars", data: nutrition.sugar },
    { name: "Protein", data: nutrition.protein, boldName: true },
  ];

  return (
    <Card className="w-64 border-2 border-black bg-white p-2 text-black">
      <CardContent className="p-0">
        <div className="mb-1 border-b-8 border-black pb-1 text-3xl font-extrabold">
          Nutrition Facts
        </div>
        <div className="mb-2 text-sm">
          <div>{`Service Size ${nutrition.servingSize}`}</div>
          {/* <div>{0}</div> */}
        </div>
        <div className="mb-1 flex items-end justify-between border-b-4 border-t-4 border-black py-1">
          <span className="text-2xl font-bold">Calories</span>
          <span className="text-4xl font-bold">{nutrition.calories.value}</span>
        </div>
        <div className="mb-1 text-right text-xs font-bold">% Daily Value*</div>
        {facts.map((fact, index) => {
          if (fact?.data?.value > 0) {
            return (
              <React.Fragment key={index}>
                <NutritionFactRow
                  name={fact.name}
                  amount={`${fact.data.value}${fact.data.unit}`}
                  dailyValue={`${fact.data.dailyPercent}`}
                  boldName={fact.boldName}
                />
              </React.Fragment>
            );
          }
        })}

        <div className="mt-2 border-t border-black pt-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </div>
      </CardContent>
    </Card>
  );
}
