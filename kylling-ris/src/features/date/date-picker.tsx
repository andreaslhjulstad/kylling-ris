import moment from "moment";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./date-picker.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { selectDate } from "../food-log/food-log-reducer";
import { Calendar } from "primereact/calendar";
import "./primereact-theme.css";
import { addLocale } from "primereact/api";
import { FormEvent } from "primereact/ts-helpers";
import { Tooltip } from 'react-tooltip'
import { FaRegCalendarAlt } from "react-icons/fa"

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [disableForward, setDisableForward] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [touchUI, setTouchUI] = useState(window.innerWidth <= 775);
  const calendarRef = useRef<HTMLDivElement>(null);
  const weekdayRef = useRef<HTMLHeadingElement>(null);

  const dispatch = useDispatch();

  // UseEffect that adds event listeners to the document, and removes them when the component unmounts
  useEffect(() => {
    // Method to be used inside an event listener that closes the calendar when the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      // The calendar should not close when the user clicks on the weekday.
      // This ensures no weird behavior with the calendar closing and opening immediately
      const excluded = [weekdayRef.current];
      if (
        !excluded.some((e) => e?.contains(event.target as Node)) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    // Method to be used inside an event listener to set the touchUI state for the calendar based on the window width
    const handleResize = () => {
      if (window.innerWidth <= 775) {
        setTouchUI(true);
      } else {
        setTouchUI(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    window.addEventListener("resize", handleResize, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("resize", handleResize, true);
    };
  }, []);

  useEffect(() => {
    const isToday =
      Math.ceil(date.getTime() / (1000 * 3600 * 24)) ===
      Math.ceil(new Date().getTime() / (1000 * 3600 * 24));

    // The user should not be able to navigate to future dates
    setDisableForward(isToday);

    // Updates the date in the redux store
    dispatch(selectDate({ date: date.toISOString().split("T")[0] }));
  }, [date, dispatch]);

  /**
   * Helper method to increment the date by one day, also closes the calendar
   * Used by the forward arrow element
   */
  const handleIncrementDate = () => {
    if (!disableForward) {
      setDate(moment(date).add(1, "days").toDate());
      setShowCalendar(false);
    }
  };

  /**
   * Helper method to decrement the date by one day, also closes the calendar
   * Used by the backward arrow element
   */
  const handleDecrementDate = () => {
    setDate(moment(date).subtract(1, "days").toDate());
    setShowCalendar(false);
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

  // Adds the norwegian locale to the calendar
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

  /**
   * Fires when the user selects a date from the calendar
   * @param event The change event from the calendar
   */
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
      setShowCalendar(false);
    }
  }

  return (
    <div className={styles.dateInfo} data-testid="date-picker">
      <div className={styles.weekdayNavigation}>
        <FiChevronLeft
          className={styles.navigationArrow}
          size={30}
          onClick={handleDecrementDate}
          data-testid="backward-arrow"
        />
        <h1
          ref={weekdayRef}
          className={styles.weekday}
          onClick={() => setShowCalendar(true)}
          data-testid="weekday"
          data-tooltip-id="weekday-tooltip" 
          data-tooltip-content="Trykk for å åpne kalenderen" 
        >
          {weekdays[date.getDay()]} <FaRegCalendarAlt size={25}/>
        </h1>
        <Tooltip id="weekday-tooltip" style={ { backgroundColor: "#3f3f40", color: "white" } } />
        <FiChevronRight
          className={
            disableForward
              ? styles.disabledNaviagtionArrow
              : styles.navigationArrow
          }
          size={30}
          onClick={handleIncrementDate}
          data-testid="forward-arrow"
        />
      </div>
      <p className={styles.date} data-testid="full-date">{`${date.getDate()}. ${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</p>
      {showCalendar && (
        <div ref={calendarRef} className={styles.calendarContainer} data-testid="calendar-container">
          <Calendar
            inline
            locale="no"
            dateFormat="dd/mm/yy"
            touchUI={touchUI}
            maxDate={new Date()}
            onChange={handleDatePickerChange}
            value={date}
            data-testid="calendar"
          />
        </div>
      )}
    </div>
  );
}
