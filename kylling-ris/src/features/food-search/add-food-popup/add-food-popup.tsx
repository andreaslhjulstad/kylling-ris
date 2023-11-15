import FoodInfo from "../search-results/food-info";
import styles from "./add-food-popup.module.css";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFood, selectDate } from "../../food-log/food-log-reducer";
import useOnKeyDown from "../../misc/use-on-key-down";
import addImage from "../../../assets/add.png";
import { Dialog, Transition } from "@headlessui/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import nb from "date-fns/locale/nb";
import { RootState } from "../../../redux/store";
registerLocale("nb", nb);

interface AddFoodPopupProps {
  food: FoodInfo;
}

export default function AddFoodPopup({ food }: AddFoodPopupProps) {
  const [weightInputColor, setWeightInputColor] = useState<string>("black");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [weightInput, setWeightInput] = useState<string>(
    `${food.defaultWeight}`
  );
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.foodLog.selectedDate
  );

  function openModal() {
    setIsOpen(true);
    setWeightInputColor("black");
    setWeightInput(`${food.defaultWeight}`);
  }

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

  const calendarRef = useRef<HTMLDivElement>(null);

  function handleDateChosen(date: Date | null) {
    if (date) {
      date?.setHours(new Date().getHours());
      date?.setMinutes(new Date().getMinutes());
      date?.setSeconds(new Date().getSeconds());

      // Updates the date in the redux store
      dispatch(selectDate({ date: date.toISOString().split("T")[0] }));
    }
  }

  return (
    <>
      <img src={addImage} onClick={openModal} className={styles.addImage} />
      <Transition appear show={isOpen}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Transition.Child
            enter={styles.enter}
            enterFrom={styles.enterFrom}
            enterTo={styles.enterTo}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <div className={styles.background} />
          </Transition.Child>
          <Dialog.Panel className={styles.addFoodPopup}>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            ></button>
            <Dialog.Title className={styles.title}>{food.name}</Dialog.Title>
            <div className={styles.bottom}>
              <div
                ref={calendarRef}
                className="card flex justify-content-center"
              >
                <DatePicker
                  selected={new Date(selectedDate)}
                  onChange={(date) => handleDateChosen(date)}
                  dateFormat="dd/MM/yy"
                  maxDate={new Date()}
                  locale="nb"
                />
              </div>
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
                className={styles.submitButton}
                onClick={() => {
                  submitFood();
                }}
              >
                Add to Log
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
}
