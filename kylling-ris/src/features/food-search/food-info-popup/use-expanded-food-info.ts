import { gql, useQuery } from "@apollo/client";
import FoodInfoExpanded from "./food-info-expanded";

export function useExpandedFoodInfo(foodId: string): {
  data?: FoodInfoExpanded;
  loading: boolean;
} {
  const { data, loading } = useQuery(
    gql`
      query FoodInfo($where: FoodInfoWhere) {
        foodInfos(where: $where) {
          id
          name
          image
          brand
          defaultWeight
          ingredients
          weightUnit
          allergens
          relativeCalories
          relativeProtein
          relativeCarbs
          relativeFat
          relativeFiber
          relativeSaturatedFat
          relativeSalt
          relativeSugars
        }
      }
    `,
    {
      variables: {
        where: {
          id: foodId
        }
      }
    }
  );

  return {
    data:
      data === undefined || data.foodInfos.length === 0
        ? undefined
        : data.foodInfos[0],
    loading
  };
}
