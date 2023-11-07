import FoodInfo from "./food-info";
import useSearchResults from "./use-search-results";
import styles from "./search-results.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import FoodItem, { foodItem } from "../../food-log/food-item";
import AddFoodPopup from "../add-food-popup/add-food-popup";

interface SearchResultsProps {
  searchQuery: string;
}

// g to kg and ml to L conversion for display.
const appropriateUnit = (x: number, standardUnit: string) => {
  if (x > 999 && standardUnit === "g") {
    return `${x / 1000}kg`;
  }
  if (x > 999 && standardUnit === "ml") {
    return `${x / 1000}l`;
  }
  return `${x}${standardUnit}`;
};

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const searchOptions = useSelector((state: RootState) => state.searchOption);

  const { foods, hasMoreFoodItems, loadMoreFoodItems } = useSearchResults(
    searchQuery,
    searchOptions
  );

  return (
    <div className={styles.searchResults}>
      <InfiniteScroll
        initialScrollY={0}
        dataLength={foods.length}
        next={loadMoreFoodItems}
        loader={<p className={styles.loadingFoodItemsMessage}>Loading...</p>}
        hasMore={hasMoreFoodItems}
        className={styles.invisibleScrollbar}
        height={0.8 * window.innerHeight}
      >
        {foods.map((food: FoodInfo) => {
          const defaultWeightFoodItem: FoodItem = foodItem(
            food,
            food.defaultWeight
          )!;
          return (
            <div
              className={styles.foodItem}
              key={food.id}
              data-testid={`food-search-result-${food.id}`}
            >
              <AddFoodPopup
                food={food}
              />
              <div className={styles.foodInfo}>
                <h1>{food.name}</h1>
                <h2>
                  {
                    //Only puts " - " between the fields that are present.
                    [
                      food.brand,
                      appropriateUnit(food.defaultWeight, food.weightUnit),
                      `Protein: ${defaultWeightFoodItem.protein}g`,
                      `${defaultWeightFoodItem.calories}kcal`
                    ]
                      .filter((text) => text.length > 0)
                      .join(" - ")
                  }
                </h2>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
