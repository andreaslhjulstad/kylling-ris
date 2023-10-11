import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import FoodInfo from "./food-info";
import { useState, useEffect } from "react";
import { SearchOption } from "../search-options/search-option-reducer";

//Future useSearchResults:
//Use tanstack query to retreive food items.
//Include searchQuery, filters, sorts in request so that the server can take care of it.
export default useTemporarySearchResults;

const initialResultsLoaded = 14;

const sortComparison: {
  [sortName: string]: (a: FoodInfo, b: FoodInfo) => number;
} = {
  "name-ascending": (a, b) => a.name.localeCompare(b.name),
  "name-descending": (a, b) => b.name.localeCompare(a.name),
  "protein-ascending": (a, b) => a.relativeProtein - b.relativeProtein,
  "protein-descending": (a, b) => b.relativeProtein - a.relativeProtein,
  "kcal-ascending": (a, b) => a.relativeCalories - b.relativeCalories,
  "kcal-descending": (a, b) => b.relativeCalories - a.relativeCalories
};

//This tries to simulate how it would be if we used our server.
function useTemporarySearchResults(
  searchQuery: string,
  searchOptions: SearchOption
): {
  foods: FoodInfo[];
  hasMoreFoodItems: boolean;
  loadMoreFoodItems: () => Promise<void>;
} {
  const [resultsLoaded, setResultsLoaded] =
    useState<number>(initialResultsLoaded);
  const allFoods: FoodInfo[] = useSelector(
    (state: RootState) => state.searchResults.foods
  );
  // In the future we don't want to send a new request on every character typed by the user.
  const searchQueryAfterInactivity = useUpdateOnInactivity(300, searchQuery);

  //Reset the amount of food items shown when the search changes.
  useEffect(() => {
    setResultsLoaded(initialResultsLoaded);
  }, [searchQueryAfterInactivity]);

  //Applying sort, allergen filter and search.
  const filteredFoodItems = allFoods
    .filter((food) => queryIsSimilarTo(searchQueryAfterInactivity, food.name))
    .filter(
      ({ allergens }) =>
        !searchOptions.allergens.some((disallowedAllergen) =>
          allergens.includes(disallowedAllergen)
        )
    )
    .sort(sortComparison[searchOptions.sortOption]);

  return {
    foods: filteredFoodItems.slice(0, resultsLoaded),
    loadMoreFoodItems: async () => {
      //Simulates the loading time of retrieving from server.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResultsLoaded((previous) => previous + 10);
    },
    hasMoreFoodItems: resultsLoaded < filteredFoodItems.length
  };
}

//Temporary. Should be done by the server with a better algorithm.
//Query is similar, here, if the term starts with the query (case insensitive).
//"kyl" is similar to "Kyllingfilet" - "xkyl" is not.
const queryIsSimilarTo = (rawQuery: string, rawTerm: string): boolean => {
  const query = rawQuery.toLowerCase();
  const term = rawTerm.toLowerCase();
  for (let i = 0; i < query.length; i++) {
    if (term.charAt(i) !== query.charAt(i)) {
      return false;
    }
  }
  return true;
};

//Only updates the returned value after a time of inactivity updating value.
function useUpdateOnInactivity<T>(
  timeInactiveBeforeUpdate: number,
  value: T
): T {
  const [infrequentlyUpdatedValue, setInfrequentlyUpdatedValue] =
    useState<T>(value);
  const [updatesWaiting, setUpdatesWaiting] = useState<number>(0);

  useEffect(() => {
    setUpdatesWaiting((previous) => previous + 1);
    setTimeout(() => {
      setUpdatesWaiting((previous) => previous - 1);
    }, timeInactiveBeforeUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (updatesWaiting === 0) {
      setInfrequentlyUpdatedValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatesWaiting]);

  return infrequentlyUpdatedValue;
}
