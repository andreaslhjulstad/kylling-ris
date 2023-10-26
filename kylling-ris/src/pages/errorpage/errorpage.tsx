import styles from "./errorpage.module.css";
import TitleAndLogo from "../../features/title-logo/title-logo";

export default function ErrorPage() {
  return (
    <div className={styles.errorWrapper} id="error-page">
      <TitleAndLogo />
      <div className={styles.message}>
        <h1>Her har det skjedd en feil!</h1>
        <p>Beklager, denne siden finnes ikke.</p>
      </div>
    </div>
  );
}
