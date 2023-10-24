import "./app.css";
import Mainpage from "../pages/mainpage/mainpage.tsx";
import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/loginpage/loginpage.tsx";
import ErrorPage from "../pages/errorpage/errorpage.tsx";

export default function App() {
  const routes = useRoutes([
    { path: "/project2", element: <Mainpage /> },
    { path: "project2/login", element: <LoginPage /> },
    { path: "*", element: <ErrorPage /> }
  ]);
  return routes;
}
