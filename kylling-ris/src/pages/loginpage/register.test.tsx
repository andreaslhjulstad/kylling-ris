import "@testing-library/jest-dom";
import { describe, expect } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import RegisterPage from "./registerpage";

describe("Register page", () => {
  test("Register page renders correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    const username = getByTestId("username");
    const email = getByTestId("e-mail");
    const password = getByTestId("password");
    const confirmPassword = getByTestId("confirm-password");
    const toggle1 = getByTestId("toggle-1");
    const toggle2 = getByTestId("toggle-2");
    const submit = getByTestId("submit");
    const login = getByTestId("navigate-login");
    const mainpage = getByTestId("navigate-mainpage");

    // Test elements rendered correctly
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(toggle1).toBeInTheDocument();
    expect(toggle2).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(mainpage).toBeInTheDocument();

    // Test initial state of elements
    expect(username).toHaveValue("");
    expect(email).toHaveValue("");
    expect(password).toHaveValue("");
    expect(confirmPassword).toHaveValue("");
    expect(submit).toBeDisabled();
  });

  test("Submit button enabling", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    const username = getByTestId("username");
    const email = getByTestId("e-mail");
    const password = getByTestId("password");
    const confirmPassword = getByTestId("confirm-password");
    const submit = getByTestId("submit");

    // Test submit button enabled/disabled (covers most cases, but not all)
    await userEvent.type(username, "OlaNordmann93");
    expect(submit).toBeDisabled();
    expect(username).toHaveValue("OlaNordmann93");
    await userEvent.clear(username);

    await userEvent.type(email, "Ola.Nordmann@mail.no");
    expect(submit).toBeDisabled();
    expect(email).toHaveValue("Ola.Nordmann@mail.no");
    await userEvent.clear(email);

    await userEvent.type(password, "oLa_123.");
    expect(submit).toBeDisabled();
    expect(password).toHaveValue("oLa_123.");
    await userEvent.clear(password);

    await userEvent.type(confirmPassword, "oLa_123.");
    expect(submit).toBeDisabled();
    expect(confirmPassword).toHaveValue("oLa_123.");
    await userEvent.clear(confirmPassword);

    await userEvent.type(username, "OlaNordmann93");
    await userEvent.type(email, "Ola.Nordmann@mail.no");
    expect(submit).toBeDisabled();
    await userEvent.type(password, "oLa_123.");
    expect(submit).toBeDisabled();
    await userEvent.type(confirmPassword, "oLa_123.");
    expect(submit).toBeEnabled(); // Enabled with 4 inputs
  });

  test("User inputs", async () => {
    const { getByTestId, getByText, queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    const username = getByTestId("username");
    const email = getByTestId("e-mail");
    const password = getByTestId("password");
    const confirmPassword = getByTestId("confirm-password");
    const submit = getByTestId("submit");

    // Test illegal values
    await userEvent.type(username, "a");
    await userEvent.type(email, "a");
    await userEvent.type(password, "a");
    await userEvent.type(confirmPassword, "b");
    await userEvent.click(submit);

    expect(
      getByText("Brukernavn må inneholde minst 3 tegn.")
    ).toBeInTheDocument();
    expect(getByText("E-postadresse må være gyldig.")).toBeInTheDocument();
    expect(
      getByText("Passordet må inneholde minst 8 tegn.")
    ).toBeInTheDocument();
    expect(getByText("Passordene må være like.")).toBeInTheDocument();

    // Legal username, confirmPassword equal to password. Rest illegal
    await userEvent.type(username, "bcd");
    await userEvent.type(email, "@b");
    await userEvent.type(password, "bcdefgh");
    await userEvent.clear(confirmPassword);
    await userEvent.type(confirmPassword, "abcdefgh");
    await userEvent.click(submit);

    expect(
      queryByText("Brukernavn må inneholde minst 3 tegn.")
    ).not.toBeInTheDocument();

    expect(getByText("E-postadresse må være gyldig.")).toBeInTheDocument();
    expect(
      getByText("Passordet må inneholdet minst én stor bokstav.")
    ).toBeInTheDocument();
    expect(queryByText("Passordene må være like.")).not.toBeInTheDocument();

    // Legal username and email, illegal password (lower case)
    await userEvent.type(email, ".com");
    await userEvent.clear(password);
    await userEvent.clear(confirmPassword);
    await userEvent.type(password, "ABCDEFGHI");
    await userEvent.type(confirmPassword, "ABCDEFGHI");
    await userEvent.click(submit);

    expect(
      queryByText("E-postadresse må være gyldig.")
    ).not.toBeInTheDocument();
    expect(
      getByText("Passordet må inneholdet minst én liten bokstav.")
    ).toBeInTheDocument();

    // Illegal password (number)
    await userEvent.clear(password);
    await userEvent.clear(confirmPassword);
    await userEvent.type(password, "aBCDEFGHI");
    await userEvent.type(confirmPassword, "aBCDEFGHI");
    await userEvent.click(submit);

    expect(
      getByText("Passordet må inneholdet minst ett tall.")
    ).toBeInTheDocument();
    expect(
      queryByText("Passordet må inneholdet minst én liten bokstav.")
    ).not.toBeInTheDocument();

    // Illegal password (symbol)
    await userEvent.clear(password);
    await userEvent.clear(confirmPassword);
    await userEvent.type(password, "a1CDEFGHI");
    await userEvent.type(confirmPassword, "a1CDEFGHI");
    await userEvent.click(submit);

    expect(
      getByText("Passordet må inneholdet minst ett symbol.")
    ).toBeInTheDocument();
    expect(
      queryByText("Passordet må inneholdet minst ett tall.")
    ).not.toBeInTheDocument();

    // All fields legal
    await userEvent.clear(password);
    await userEvent.clear(confirmPassword);
    await userEvent.type(password, "a1C_EFGHI");
    await userEvent.type(confirmPassword, "a1C_EFGHI");
    await userEvent.click(submit);

    expect(
      queryByText("Passordet må inneholdet minst ett symbol.")
    ).not.toBeInTheDocument();
  }, 15000);
});
