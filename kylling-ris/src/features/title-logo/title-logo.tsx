import { Link } from "react-router-dom";
import styles from "./title-logo.module.css";

export default function TitleAndLogo() {
  return (
    <div className={styles.pageTitleContainer}>
      <Link className={styles.pageLink} to={"/project2"}>
        <h1 className={styles.pageTitleBlue}>
          Kylling<span className={styles.pageTitleRed}>&</span>Ris
        </h1>
        <img className={styles.logo} src="../../../public/logo.svg"></img>
      </Link>
    </div>
  );
}
