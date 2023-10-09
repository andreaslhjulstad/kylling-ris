export default interface Food {
  id: number;
  name: string;
  brand: string;
  weight: number | null;
  default_weight: number,
  weight_unit: string;
  allergens: string[];
  calories: number;
  protein: number;
}
