import FoodInfo from "../food-search/search-results/food-info";

export default interface FoodItem {
  id: number;
  name: string;
  brand: string;
  weight: number;
  weightUnit: string;
  allergens: string[];
  calories: number;
  protein: number;
}

const roundToDigit = (x: number, digit: number): number =>
  Number(x.toFixed(digit));

// per 100g or per 100ml
const weightStandard = 100;
//Temporary - move to server.
export const foodItem = (
  foodInfo: FoodInfo,
  weight: number,
  id: number = 0
): FoodItem | null =>
  weight <= 0
    ? null
    : {
        ...foodInfo,
        id,
        weight,
        calories: roundToDigit(
          (foodInfo.relativeCalories / weightStandard) * weight,
          1
        ),
        protein: roundToDigit(
          (foodInfo.relativeProtein / weightStandard) * weight,
          1
        )
      };
