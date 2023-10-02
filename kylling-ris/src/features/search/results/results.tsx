import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Food from "./food";

export default function Results() {
  const foods = useSelector((state: RootState) => state.food.foods);

  function getNutrition(food: Food, code: string): number | undefined {
    const nutrient = food.nutrition.find((n) => n.code === code);
    return nutrient ? nutrient.amount : undefined;
  }

  return (
    <div>
      {foods.map((food: Food) => (
        <div key={food.id}>
          <p>{food.name}</p>
          <p>Kalorier: {getNutrition(food, "energi_kcal")}</p>
          <p>Proteiner: {getNutrition(food, "protein")}g</p>
        </div>
      ))}
    </div>
  );
}
