import FoodLogTable from "../../features/food-log/food-log-table";
import FoodSearch from "../../features/food-search/food-search";
import styles from "./mainpage.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import DatePicker from "../../features/date/date-picker";

export default function Mainpage() {
  const dateFoodMap = useSelector((state: RootState) => state.log.dateFoodMap);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchAndLogoCard}>
        <div className={styles.pageTitleContainer}>
          <h1 className={styles.pageTitleBlue}>
            Kylling<span className={styles.pageTitleRed}>&</span>Ris
          </h1>
          <img className={styles.logo} src="../../../public/logo.svg"></img>
        </div>
        <div className={styles.search}>
          <FoodSearch />
        </div>
      </div>
      <div className={styles.logAndDateCard}>
        <DatePicker />
        <div className={styles.tableWrapper}>
          <FoodLogTable
            loggedFoods={
              dateFoodMap[
                useSelector((state: RootState) => state.log.currentDate)
              ] ?? []
            }
          />
        </div>
      </div>
    </div>
  );
}
