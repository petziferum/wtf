export enum Ingredient {
  ZUCKER = "Zucker",
  MEHL = "Mehl",
  HACKFLEISCH = "Hackfleisch",
  PASSIERTE_TOMATEN = "Passierte Tomaten",
  SPAGHETTI = "Spaghetti",
}

const IngredientToBeschreibung = new Map<string, string>([
  [Ingredient.HACKFLEISCH, "Hackfleisch"],
  [Ingredient.MEHL, "Mehl"],
  [Ingredient.ZUCKER, "Zucker"],
  [Ingredient.PASSIERTE_TOMATEN, "Passierte Tomaten"],
  [Ingredient.SPAGHETTI, "Spaghetti"],
]);

export const ingredientsAsRecord: Record<string, string>[] = Object.values(
  Ingredient
).map((key) => {
  return {
    key: key,
    value: IngredientToBeschreibung.get(key) as string,
  };
});
