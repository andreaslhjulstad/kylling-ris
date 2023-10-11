import Popup from "reactjs-popup";
import FoodInfo from "../search-results/food-info";
import styles from "./add-food-popup.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../../food-log/food-log-reducer";
import useOnKeyDown from "../../misc/use-on-key-down";

interface AddFoodPopupProps {
  food: FoodInfo;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
}

export default function AddFoodPopup({ food, trigger }: AddFoodPopupProps) {
  const [weightInputColor, setWeightInputColor] = useState<string>("black");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [weightInput, setWeightInput] = useState<string>(
    `${food.defaultWeight}`
  );
  const dispatch = useDispatch();

  const submitFood = () => {
    const weight = Number(weightInput);
    if (isNaN(weight) || weight <= 0) {
      setWeightInputColor("red");
      return;
    }
    dispatch(addFood({ foodInfo: food, weight }));
    setIsOpen(false);
  };

  useOnKeyDown(
    () => {
      if (isOpen) {
        submitFood();
      }
    },
    ["Enter"],
    [weightInput, isOpen]
  );

  return (
    <Popup
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
        setWeightInputColor("black");
        setWeightInput(`${food.defaultWeight}`);
      }}
      trigger={trigger}
      modal
    >
      <div className={styles.addFoodPopup}>
        <h1>{food.name}</h1>
        <div className={styles.bottom}>
          <div className={styles.weightInput}>
            <input
              style={{ color: weightInputColor }}
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
              submitFood();
            }}
          >
            Add to Log
          </button>
        </div>
      </div>
    </Popup>
  );
}
