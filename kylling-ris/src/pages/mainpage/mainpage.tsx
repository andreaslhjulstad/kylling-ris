import FoodSearch from "../../features/food-search/food-search";
import styles from "./mainpage.module.css";

export default function Mainpage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchAndLogoCard}>
        <div className={styles.pageTitleContainer}>
          <h1 className={styles.pageTitleBlue}>Kylling</h1>
          <h1 className={styles.pageTitleRed}>&</h1>
          <h1 className={styles.pageTitleBlue}>Ris</h1>
          {/*Placeholder logo element*/}
          <img className={styles.logo} src=""></img>
        </div>
        <div className={styles.search}>
          <FoodSearch />
        </div>
      </div>
      <div className={styles.logAndDateCard}>
        <h2 className={styles.weekday}>Onsdag</h2>
        <div>
          {/*Assigned div for the log table component.*/}
          <div></div>
        </div>
      </div>
    </div>
  );
}
