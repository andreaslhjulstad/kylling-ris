import "@testing-library/jest-dom";
import { describe, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import LoginPage from "./loginpage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Login page", () => {
  test("Login page renders correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const email = getByTestId("e-mail");
    const password = getByTestId("password");
    const toggle = getByTestId("toggle");
    const submit = getByTestId("submit");
    const register = getByTestId("navigate-register");
    const mainpage = getByTestId("navigate-mainpage");

    // Test elements rendered correctly
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(toggle).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(register).toBeInTheDocument();
    expect(mainpage).toBeInTheDocument();

    // Test initial state of elements
    expect(email).toHaveValue("");
    expect(password).toHaveValue("");
    expect(submit).toBeDisabled();
  });

  test("User inputs", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const email = getByTestId("e-mail");
    const password = getByTestId("password");
    const submit = getByTestId("submit");

    // Test simple inputs and submit button
    await userEvent.type(email, "Ola.Nordmann@mail.no");
    expect(submit).toBeDisabled();
    expect(email).toHaveValue("Ola.Nordmann@mail.no");
    await userEvent.clear(email);
    await userEvent.type(password, "ola123");
    expect(submit).toBeDisabled();
    expect(password).toHaveValue("ola123");
    await userEvent.type(email, "Ola.Nordmann@mail.no");
    expect(submit).toBeEnabled();

    // Test whitespace not added
    await userEvent.clear(email);
    await userEvent.clear(password);
    await userEvent.type(email, " Ol   a.Nordman n@ma  il.no    ");
    await userEvent.type(password, " ola 123");
    expect(email).toHaveValue("Ola.Nordmann@mail.no");
    expect(password).toHaveValue("ola123");

    // Assert email redux updated on submit
    await userEvent.click(submit);

    await waitFor(() => {
      const state = store.getState();
      expect(state.user.email).toBe("Ola.Nordmann@mail.no");
    });
  });
});
