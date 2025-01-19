"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RecipeUrlInput({
  loading,
  onSubmit,
}: {
  loading?: boolean;
  onSubmit: (url: string) => void;
}) {
  const [recipeUrlInput, setRecipeUrlInput] = useState<string>("");

  const handleClick = () => {
    onSubmit?.(recipeUrlInput);
  };

  return (
    <div className="flex min-w-full flex-row gap-2">
      <div className="flex-1">
        <Input
          className="text-black"
          placeholder="Enter url..."
          onChange={(e) => setRecipeUrlInput(e.target.value)}
        />
      </div>
      <div className="w-48 flex-none">
        <Button className="w-full" onClick={handleClick} disabled={loading}>
          Scrape!
        </Button>
      </div>
    </div>
  );
}
