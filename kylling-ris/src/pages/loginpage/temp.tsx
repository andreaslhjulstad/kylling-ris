import { Link, redirect } from "react-router-dom";
import styles from "./login.module.css";
import TitleAndLogo from "../../features/title-logo/title-logo";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./current-user-reducer";
import { InputText } from "primereact/inputtext";

export default function RegisterPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  function style(error: any) {
    if (error) {
      return { backgroundColor: "rgba(255, 0, 0, 0.5)" };
    }
  }
  const ref = useRef();

  const displayInvalidity = () => {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
    if (regex.test(password)) {
      setError(true);
    }
  };

  /* Saves currently logged in email in redux */
  function registerUser(event: React.FormEvent) {
    // Only passwords equal to "confirmPassword" are accepted up to this point
    /* Check password length */
    if (password.length < 8) {
    }

    // Currently takes user to main page and saves email (currently logged in user) in redux
    dispatch(loginUser(currentEmail));
    redirect("/");
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.TitleAndLogoContainer}>
        <TitleAndLogo />
      </div>
      <h2 className={styles.loginHeader}>Opprett en bruker</h2>
      <div className={styles.inputForm}>
        <label htmlFor="name">Brukernavn</label>
        <InputText
          className={` ${styles.inputField}`}
          name="name"
          keyfilter="alphanum"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">E-postadresse</label>
        <InputText
          className={` ${styles.inputField}`}
          name="email"
          keyfilter="email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
        />
        <label htmlFor="password">Passord</label>
        <InputText
          className={` ${styles.inputField}`}
          name="password"
          keyfilter={/[^s]/}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={displayInvalidity}
          style={style(error)}
        />
        <label htmlFor="confirmPassword">Bekreft passord</label>
        <InputText
          className={` ${styles.inputField}`}
          name="confirmPassword"
          keyfilter={/[^s]/}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className={`${styles.inputField} ${styles.submitButton}`}
          name="submitButton"
          disabled={
            !(password == confirmPassword) ||
            !password ||
            !confirmPassword ||
            !currentEmail ||
            !username
          }
          onClick={registerUser}
        >
          Opprett bruker
        </button>
      </div>
      <span className={styles.registerLink}>
        <p className={styles.guest}>Har du allerede en bruker?</p>
        <div className={styles.guest}>
          <Link className={styles.pageLink} to={"/login"}>
            <p>Tilbake til innloggingssiden</p>
          </Link>
        </div>
        <div>
          <Link className={styles.pageLink} to={"/"}>
            <p>Fortsett som gjest</p>
          </Link>
        </div>
      </span>
    </div>
  );
}
