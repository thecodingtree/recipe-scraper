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
    <div>
      <Input
        className="text-black"
        placeholder="Enter a url to scrape"
        onChange={(e) => setRecipeUrlInput(e.target.value)}
      />
      <Button onClick={handleClick} disabled={loading}>
        Scrape!
      </Button>
    </div>
  );
}
