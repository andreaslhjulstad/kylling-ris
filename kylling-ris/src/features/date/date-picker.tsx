import moment from "moment";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./date-picker.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { selectDate } from "../food-log/food-log-reducer";
import { Calendar } from "primereact/calendar";
import "./primereact-theme.css";
import { addLocale } from "primereact/api";
import { FormEvent } from "primereact/ts-helpers";

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [disableForward, setDisableForward] = useState(false);
  const [hideCalendar, setHideCalendar] = useState(true);
  const [touchUI, setTouchUI] = useState(window.innerWidth <= 775);

  const dispatch = useDispatch();

  // Set the 'touchUI' state based on the window width
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 775) {
      setTouchUI(true);
    } else {
      setTouchUI(false);
    }
  });

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

  addLocale("no", {
    firstDayOfWeek: 1,
    dayNamesMin: ["S", "M", "T", "O", "T", "F", "L"],
    monthNames: months,
    monthNamesShort: [
      "jan",
      "feb",
      "mar",
      "apr",
      "mai",
      "jun",
      "jul",
      "aug",
      "sep",
      "okt",
      "nov",
      "des"
    ]
  });

  useEffect(() => {
    console.log(date);
    const isToday =
      Math.ceil(date.getTime() / (1000 * 3600 * 24)) ===
      Math.ceil(new Date().getTime() / (1000 * 3600 * 24));

    // The user should not be able to navigate to future dates
    setDisableForward(isToday);

    // Updates the date in the redux store
    dispatch(selectDate({ date: date.toISOString().split("T")[0] }));
  }, [date, dispatch]);

  function handleDatePickerChange(
    event: FormEvent<Date, SyntheticEvent<Element, Event>>
  ): void {
    const dateFromCalendar = event.value;
    // This code handles a bug where the date would be set to the previous day if the user selected a date from the calendar.
    // It sets the hours, minutes and seconds to the current time to avoid this issue.
    dateFromCalendar?.setHours(new Date().getHours());
    dateFromCalendar?.setMinutes(new Date().getMinutes());
    dateFromCalendar?.setSeconds(new Date().getSeconds());
    if (dateFromCalendar) {
      setDate(dateFromCalendar);
      setHideCalendar(true);
    }
  }

  return (
    <div className={styles.dateInfo}>
      <div className={styles.weekdayNavigation}>
        <FiChevronLeft
          className={styles.navigationArrow}
          size={30}
          onClick={handleDecrementDate}
        />
        <h1
          className={styles.weekday}
          onClick={() => setHideCalendar(!hideCalendar)}
        >
          {weekdays[date.getDay()]}
        </h1>
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
      <Calendar
        inline
        locale="no"
        dateFormat="dd/mm/yy"
        touchUI={touchUI}
        style={{ width: "35%", display: hideCalendar ? "none" : "block" }}
        maxDate={new Date()}
        onChange={handleDatePickerChange}
        value={date}
      />
    </div>
  );
}
