import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { test } from "vitest";
import FoodSearch from "./food-search";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../../apollo-client/apollo-client";
import { Provider } from "react-redux";
import store from "../../redux/store";
import {
  searchInactivityTime,
  searchResultsPerLoad
} from "./search-results/use-search-results";
import userEvent from "@testing-library/user-event";

test("FoodSearch", async () => {
  const { getByTestId, getAllByTestId } = render(
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <FoodSearch />
      </ApolloProvider>
    </Provider>
  );
  const searchResults = () =>
    waitFor(() => getAllByTestId("food-search-result")).catch(() => []);

  expect((await searchResults()).length).toBe(searchResultsPerLoad);

  const searchBar = await waitFor(() => getByTestId("search-bar"));
  expect(searchBar).toBeInTheDocument();

  //Testing both empty search results and updating after inactivity.
  await userEvent.type(searchBar, "srntdeaisrntdeiasrntdeai");
  //Immediately, search results shouldn't change.
  expect((await searchResults()).length).toBe(searchResultsPerLoad);
  //Only after a period of inactivity should the results be cleared.
  await new Promise((resolve) => setTimeout(resolve, searchInactivityTime));
  expect((await searchResults()).length).toBe(0);
});
