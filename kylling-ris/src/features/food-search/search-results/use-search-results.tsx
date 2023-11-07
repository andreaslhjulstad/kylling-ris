import FoodInfo from "./food-info";
import { useState, useEffect } from "react";
import { SearchOption } from "../search-options/search-option-reducer";
import { gql, useQuery } from "@apollo/client";

const searchResultsPerLoad: number = 12;

export default function useSearchResults(
  searchQuery: string,
  searchOptions: SearchOption
): {
  foods: FoodInfo[];
  hasMoreFoodItems: boolean;
  loadMoreFoodItems: () => void;
} {
  const [hasMoreFoodItems, setHasMoreFoodItems] = useState<boolean>(true);

  // Avoids fetching on every single key input from the user.
  const searchQueryAfterInactivity = useUpdateOnInactivity(300, searchQuery);

  const { data, fetchMore, refetch } = useQuery(
    gql`
      query FoodInfos(
        $options: FoodInfoOptions
        $where: FoodInfoWhere
        $fulltext: FoodInfoFulltext
      ) {
        foodInfos(options: $options, where: $where, fulltext: $fulltext) {
          id
          name
          brand
          defaultWeight
          weightUnit
          allergens
          relativeCalories
          relativeProtein
        }
      }
    `,
    {
      variables: {
        options: {
          limit: searchResultsPerLoad,
          offset: 0,
          sort: [
            sortOptionQueryFormat[searchOptions.sortOption] ?? { name: "ASC" }
          ]
        },
        ...allergensQueryFormat(searchOptions.allergens),
        ...searchQueryQueryFormat(searchQueryAfterInactivity)
      }
    }
  );

  // Refetching on updated parameters.
  useEffect(() => {
    refetch().then((response) => {
      // There can't be more foods if we don't receive all the foods we asked for.
      setHasMoreFoodItems(
        response.data.foodInfos.length >= searchResultsPerLoad
      );
    });
  }, [searchQueryAfterInactivity, searchOptions, refetch]);

  const foods: FoodInfo[] = data === undefined ? [] : data.foodInfos;

  return {
    foods,
    hasMoreFoodItems,
    loadMoreFoodItems: () => {
      // Safety guard
      if (foods.length < searchResultsPerLoad) {
        setHasMoreFoodItems(false);
        return;
      }

      fetchMore({
        variables: {
          options: {
            limit: searchResultsPerLoad,
            offset: foods.length,
            sort: [
              sortOptionQueryFormat[searchOptions.sortOption] ?? { name: "ASC" }
            ]
          }
        }
      }).then((response) => {
        // Determines if there are more foods to be loaded.
        const incomingFoodInfos = response.data.foodInfos;
        setHasMoreFoodItems(incomingFoodInfos.length >= searchResultsPerLoad);
        return response;
      });
    }
  };
}

const sortOptionQueryFormat: {
  [sortOption: string]: {
    [field: string]: string;
  };
} = {
  "name-ascending": { name: "ASC" },
  "name-descending": { name: "DESC" },
  "protein-ascending": { relativeProtein: "ASC" },
  "protein-descending": { relativeProtein: "DESC" },
  "kcal-ascending": { relativeCalories: "ASC" },
  "kcal-descending": { relativeCalories: "DESC" }
};

const allergensQueryFormat = (allergens: string[]) => ({
  where: {
    AND: allergens.map((allergen) => ({
      NOT: {
        allergens_INCLUDES: allergen
      }
    }))
  }
});

const searchQueryQueryFormat = (searchQuery: string) => ({
  fulltext:
    searchQuery === ""
      ? null
      : {
          name: {
            // "~" applies fuzzy search
            phrase: searchQuery + "~"
          }
        }
});

// Only updates the returned value after the input value has not been updated for a time specified.
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
