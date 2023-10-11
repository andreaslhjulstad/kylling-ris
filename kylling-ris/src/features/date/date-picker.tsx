import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./date-picker.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { selectDate } from "../food-log/food-log-reducer";

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [disableForward, setDisableForward] = useState(false);

  const dispatch = useDispatch();

  const handleIncrementDate = () => {
    if (!disableForward) {
      setDate(moment(date).add(1, "days").toDate());
    }
  };

  const handleDecrementDate = () => {
    setDate(moment(date).subtract(1, "days").toDate());
  };

  const months = [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember"
  ];

  const weekdays = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag"
  ];

  useEffect(() => {
    const isToday =
      Math.ceil(date.getTime() / (1000 * 3600 * 24)) ===
      Math.ceil(new Date().getTime() / (1000 * 3600 * 24));

    // The user should not be able to navigate to future dates
    setDisableForward(isToday);

    // Updates the date in the redux store
    dispatch(selectDate({ date: date.toISOString().split("T")[0] }));
  }, [date, dispatch]);

  return (
    <div className={styles.dateInfo}>
      <div className={styles.weekdayNavigation}>
        <FiChevronLeft
          className={styles.navigationArrow}
          size={30}
          onClick={handleDecrementDate}
        />
        <h1 className={styles.weekday}>{weekdays[date.getDay()]}</h1>
        <FiChevronRight
          className={
            disableForward
              ? styles.disabledNaviagtionArrow
              : styles.navigationArrow
          }
          size={30}
          onClick={handleIncrementDate}
        />
      </div>
      <p className={styles.date}>{`${date.getDate()}. ${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</p>
    </div>
  );
}
