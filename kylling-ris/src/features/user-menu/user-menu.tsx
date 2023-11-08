import styles from "./user-menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../pages/loginpage/current-user-reducer";
import { RootState } from "../../redux/store";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import { Alert, Snackbar } from "@mui/material";

export default function UserMenu() {
  const menu = useRef<Menu>(null);
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logOut = () => {
    if (email) {
      dispatch(logoutUser());
    }
    setOpen(true);
  };

  const logIn = () => {
    navigate("/login");
  };

  // Menu items when logged in
  const loggedInItems: MenuItem[] = [
    {
      label: email
        ? email.length > 24
          ? `${email.substring(0, 21)}...`
          : email
        : "",
      items: [
        {
          label: "Profil",
          icon: "pi pi-id-card"
        },
        {
          label: "Logg ut",
          icon: "pi pi-user-minus",
          command: () => {
            logOut();
          }
        }
      ]
    }
  ];

  // Menu items when not logged in
  const notLoggedInItems: MenuItem[] = [
    {
      label: "Logg inn",
      icon: "pi pi-user-plus",
      command: () => {
        logIn();
      }
    }
  ];

  // Handle alert confirming user logout
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // Repurpused window resize listener from food log table
  const [compact, setCompact] = useState<boolean>(window.innerWidth <= 1170);
  // Set the 'compact' state based on the window width
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1170) {
      setCompact(true);
    } else {
      setCompact(false);
    }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.userMenu}>
        <div className="card flex justify-content-center">
          <Avatar
            onClick={(event) => menu.current?.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
            label={email ? email[0] : ""}
            icon={!email ? "pi pi-user" : ""}
            style={
              compact
                ? {
                    backgroundColor: "#2275c3",
                    color: "white",
                    border: "1px solid black"
                  }
                : {
                    backgroundColor: "white",
                    color: "#2275c3",
                    border: "1px solid black"
                  }
            }
            shape="circle"
          />
          {email && (
            <Menu
              ref={menu}
              popup
              model={loggedInItems}
              popupAlignment="right"
            />
          )}
          {!email && (
            <Menu
              ref={menu}
              popup
              model={notLoggedInItems}
              popupAlignment="right"
            />
          )}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Du har blitt logget ut!
        </Alert>
      </Snackbar>
    </div>
  );
}
