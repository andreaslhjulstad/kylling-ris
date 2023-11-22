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
  const { findByTestId, findAllByTestId } = render(
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <FoodSearch />
      </ApolloProvider>
    </Provider>
  );
  const searchResults = (): Promise<HTMLElement[]> =>
    waitFor(() => findAllByTestId("food-search-result")).catch(() => []);

  //Expect there to be as many search result HTML elements as specified in use-search-results.tsx
  expect((await searchResults()).length).toBe(searchResultsPerLoad);

  const searchBar = await findByTestId("search-bar");

  //Testing both empty search results and updating after inactivity.
  await userEvent.type(searchBar, "srntdeaisrntdeiasrntdeai");
  //Immediately, search results shouldn't change.
  expect((await searchResults()).length).toBe(searchResultsPerLoad);
  //Only after a period of inactivity should the results be cleared.
  await new Promise((resolve) => setTimeout(resolve, searchInactivityTime));
  expect((await searchResults()).length).toBe(0);

  //Testing that results are alphabetically sorted from a to å.
  await userEvent.clear(searchBar);
  await new Promise((resolve) => setTimeout(resolve, searchInactivityTime));

  const aToÅResults = await searchResults();
  expect(aToÅResults.length).toBe(searchResultsPerLoad);
  const foodNames = aToÅResults.map(
    (foodHtml) => foodHtml.firstChild?.firstChild?.textContent
  );
  expect(foodNames).toStrictEqual([...foodNames].sort());
});
