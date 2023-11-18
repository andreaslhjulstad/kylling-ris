import { gql, useMutation, useQuery } from "@apollo/client";
import FoodItem from "./food-item";

export function useFoodLog(date: string): FoodItem[] {
  const { data } = useQuery(
    gql`
      query FoodLog($where: FoodItemWhere, $options: FoodItemOptions) {
        user {
          foodLog(where: $where, options: $options) {
            id
            weight
            protein
            calories
            food {
              name
              weightUnit
            }
          }
        }
      }
    `,
    {
      variables: {
        where: {
          date
        },
        //Orders by when the food was added.
        options: {
          sort: [
            {
              id: "ASC"
            }
          ]
        }
      }
    }
  );

  //Convert to a nicer object (FoodItem[]).
  return (
    data?.user?.foodLog?.map(
      (foodItem: {
        id: number;
        weight: number;
        protein: number;
        calories: number;
        food: {
          name: string;
          weightUnit: string;
        };
      }): FoodItem => ({
        ...foodItem,
        ...foodItem.food
      })
    ) ?? []
  );
}

export function useAddFoodToLog(): (
  foodInfoId: string,
  weight: number,
  date: string
) => void {
  const [addFoodToLog] = useMutation(
    gql`
      mutation AddFoodToLog($weight: Float!, $date: String!, $foodInfoId: ID!) {
        addFoodToLog(weight: $weight, date: $date, foodInfoId: $foodInfoId) {
          id
        }
      }
    `,
    { refetchQueries: ["FoodLog"] }
  );

  return (foodInfoId, weight, date) => {
    addFoodToLog({ variables: { weight, date, foodInfoId } });
  };
}

export function useDeleteFoodFromLog(): (foodItemId: number) => void {
  const [deleteFoodFromLog] = useMutation(
    gql`
      mutation DeleteFoodFromLog($foodItemId: Float!) {
        deleteFoodFromLog(id: $foodItemId)
      }
    `,
    { refetchQueries: ["FoodLog"] }
  );

  return (foodItemId) => {
    deleteFoodFromLog({
      variables: {
        foodItemId
      }
    });
  };
}
