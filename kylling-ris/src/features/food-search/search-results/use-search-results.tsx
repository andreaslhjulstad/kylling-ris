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

  const { data, fetchMore } = useQuery(
    gql`
      query FoodInfoQuery(
        $offset: Int
        $limit: Int
        $sort: String
        $allergens: [String!]
        $searchQuery: String
      ) {
        foodInfos(
          offset: $offset
          limit: $limit
          sort: $sort
          allergens: $allergens
          searchQuery: $searchQuery
        ) {
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
        offset: 0,
        limit: searchResultsPerLoad,
        sort: searchOptions.sortOption,
        searchQuery: searchQueryAfterInactivity,
        allergens: searchOptions.allergens
      }
    }
  );

  const foods: FoodInfo[] = data === undefined ? [] : data.foodInfos;

  useEffect(() => {
    // Even if there aren't any more food items,
    // loadMoreFoodItems will correct that.
    setHasMoreFoodItems(true);
  }, [searchQueryAfterInactivity, searchOptions]);

  return {
    foods,
    hasMoreFoodItems,
    loadMoreFoodItems: () => {
      // Avoids some unnecessary fetches.
      if (foods.length < searchResultsPerLoad) {
        setHasMoreFoodItems(false);
        return;
      }

      fetchMore({
        variables: {
          offset: foods.length
        }
      }).then((response) => {
        // Determine if there are more foods to be loaded.
        const incomingFoodInfos = response.data.foodInfos;
        setHasMoreFoodItems(incomingFoodInfos.length >= searchResultsPerLoad);
        return response;
      });
    }
  };
}

// Only updates the returned value after not having updated the original value for a while.
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
