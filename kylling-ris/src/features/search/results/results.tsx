import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Food from "./food";

export default function Results() {
  const foods = useSelector((state: RootState) => state.food.foods);

  return (
    <div>
      {foods.map((food: Food) => (
        <div key={food.id}>
          <p>{food.name}</p>
          <p>
            {food.brand} - {food.weight}
            {food.weight_unit} - Protein: {food.protein}g - {food.calories}kcal
          </p>
          <br></br>
        </div>
      ))}
    </div>
  );
}
