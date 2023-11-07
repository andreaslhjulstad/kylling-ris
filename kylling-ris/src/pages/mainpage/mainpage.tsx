import FoodLogTable from "../../features/food-log/food-log-table";
import FoodSearch from "../../features/food-search/food-search";
import styles from "./mainpage.module.css";
import DatePicker from "../../features/date/date-picker";
import TitleAndLogo from "../../features/title-logo/title-logo";
import UserMenu from "../../features/user-menu/user-menu";

export default function Mainpage() {
  return (
    <div className={styles.wrapper}>
      <UserMenu />
      <div className={styles.searchAndLogoCard}>
        <div className={styles.titleAndLogoContainer}>
          <TitleAndLogo />
        </div>
        <div className={styles.search}>
          <FoodSearch />
        </div>
      </div>
      <div className={styles.logAndDateCard}>
        <DatePicker />
        <div className={styles.tableWrapper}>
          <FoodLogTable />
        </div>
      </div>
    </div>
  );
}
