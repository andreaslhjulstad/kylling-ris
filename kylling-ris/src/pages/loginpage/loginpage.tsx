import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import TitleAndLogo from "../../features/title-logo/title-logo";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./current-user-reducer";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function LoginPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  // Updating password currently has no effect, only used to determine if password not null
  const [currentPassword, setCurrentPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState("pi pi-eye");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Saves currently logged in email in redux */
  function handleUserLogin(event: React.FormEvent) {
    event.preventDefault(); // Prevent default re-routing
    dispatch(loginUser(currentEmail));
    navigate("/project2"); // Return to main page
    /* 
    In the future this has to be linked to the backend to check if the given
    combination of password and email are correct, or even registered.
    Currently, a user is logged in as a guest regardless of input.
    The only difference is that the user's email will be displayed
    in the top right corner along with the option to log out (clear email redux).
    */
  }

  const toggleVisibility = () => {
    if (visibility) {
      setVisibility(false);
      setType("password");
      setEyeIcon("pi pi-eye");
    } else {
      setVisibility(true);
      setType("text");
      setEyeIcon("pi pi-eye-slash");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.TitleAndLogoContainer}>
        <TitleAndLogo />
      </div>
      <h2 className={styles.loginHeader}>Logg inn</h2>
      <form onSubmit={handleUserLogin} className={styles.inputForm}>
        <label htmlFor="email">E-postadresse</label>
        <InputText
          className={styles.inputField}
          name="email"
          keyfilter="email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          maxLength={255} // Max length for email addresses
          data-testid="e-mail"
        />
        <label htmlFor="password">Passord</label>
        <span className={styles.password}>
          <InputText
            className={styles.inputField}
            name="password"
            type={type}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            keyfilter={/^\S*$/}
            data-testid="password"
          />
          <Button
            type="button"
            className={styles.toggleButton}
            link
            icon={eyeIcon}
            onClick={toggleVisibility}
            data-testid="toggle"
          />
        </span>
        <button
          type="submit"
          className={`${styles.inputField} ${styles.submitButton}`}
          name="submitButton"
          disabled={!currentEmail || !currentPassword}
          data-testid="submit"
        >
          Logg inn
        </button>
      </form>
      <span className={styles.registerLink}>
        <p className={styles.guest}>Har du ikke en bruker?</p>
        <div className={styles.guest}>
          <Link
            data-testid="navigate-register"
            className={styles.pageLink}
            to={"/project2/register"}
          >
            <p>Opprett en ny bruker</p>
          </Link>
        </div>
        <div>
          <Link
            data-testid="navigate-mainpage"
            className={styles.pageLink}
            to={"/project2"}
          >
            <p>Fortsett som gjest</p>
          </Link>
        </div>
      </span>
    </div>
  );
}
