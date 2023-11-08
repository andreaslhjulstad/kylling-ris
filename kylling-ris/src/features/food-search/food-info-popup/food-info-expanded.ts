import FoodInfo from "../search-results/food-info";

export default interface FoodInfoExpanded extends FoodInfo {
  id: string;
  name: string;
  image: string;
  brand: string;
  ingredients: string;
  defaultWeight: number;
  weightUnit: string;
  allergens: string[];
  // per 100units

  // Kanskje vi skal endre til a bruke en nutrition-array i stedet?
  relativeCalories: number;
  relativeProtein: number;
  relativeCarbs: number;
  relativeFiber: number;
  relativeFat: number;
  relativeSaturatedFat: number;
  relativeSalt: number;
  relativeSugars: number;
}