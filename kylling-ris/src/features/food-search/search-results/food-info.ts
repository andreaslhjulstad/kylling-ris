export default interface FoodInfo {
  id: string;
  name: string;
  brand: string;
  defaultWeight: number;
  weightUnit: string;
  allergens: string[];
  // per 100units
  relativeCalories: number;
  relativeProtein: number;
}
