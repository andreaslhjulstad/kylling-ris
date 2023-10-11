import Popup from "reactjs-popup";
import FoodInfo from "../search-results/food-info";
import styles from "./add-food-popup.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../../food-log/food-log-reducer";

interface AddFoodPopupProps {
  food: FoodInfo;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
}

export default function AddFoodPopup({ food, trigger }: AddFoodPopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [weightInput, setWeightInput] = useState<string>(
    `${food.defaultWeight}`
  );
  const dispatch = useDispatch();

  return (
    <Popup open={isOpen} onOpen={() => setIsOpen(true)} trigger={trigger} modal>
      <div className={styles.addFoodPopup}>
        <h1>{food.name}</h1>
        <div className={styles.bottom}>
          <div className={styles.weightInput}>
            <input
              autoFocus
              value={weightInput}
              onChange={({ target: { value: weightInput } }) =>
                setWeightInput(weightInput)
              }
            />
            <div>{food.weightUnit}</div>
          </div>
          <button
            onClick={() => {
              const weight = Number(weightInput);
              if (isNaN(weight)) return;
              dispatch(addFood({ foodInfo: food, weight }));
              setIsOpen(false);
            }}
          >
            Add to Log
          </button>
        </div>
      </div>
    </Popup>
  );
}
