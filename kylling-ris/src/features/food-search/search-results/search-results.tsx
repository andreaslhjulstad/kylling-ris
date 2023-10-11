import FoodInfo from "./food-info";
import useSearchResults from "./use-search-results";
import styles from "./search-results.module.css";
import addImage from "../../../assets/add.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addFood } from "../../food-log/food-log-reducer";

interface SearchResultsProps {
  searchQuery: string;
}

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const searchOptions = useSelector((state: RootState) => state.searchOption);

  const { foods, hasMoreFoodItems, loadMoreFoodItems } = useSearchResults(
    searchQuery,
    searchOptions
  );

  // Dispatch used to access addFoodElement function
  const dispatch = useDispatch();

  return (
    <div className={styles.searchResults}>
      <InfiniteScroll
        initialScrollY={0}
        dataLength={foods.length}
        next={loadMoreFoodItems}
        loader={<p className={styles.loadingFoodItemsMessage}>Loading...</p>}
        hasMore={hasMoreFoodItems}
        className={styles.invisibleScrollbar}
        height={700}
      >
        {foods.map((food: FoodInfo) => (
          <div
            className={styles.foodItem}
            key={food.id}
            data-testid={`food-search-result-${food.id}`}
          >
            <img
              onClick={() => {
                // In the future: get the weight from the pop-up (set to 0 for now, uses default weight)
                const selectedWeight = 5;
                dispatch(addFood({ foodInfo: food, weight: selectedWeight }));
              }}
              className={styles.addImage}
              src={addImage}
            />
            <div className={styles.foodInfo}>
              <h1>{food.name}</h1>
              <h2>
                {
                  //Only puts " - " between the fields that are present.
                  [
                    food.brand,
                    `${food.defaultWeight}${food.weightUnit}`,
                    `Protein: ${food.relativeProtein}g`,
                    `${food.relativeCalories}kcal`
                  ]
                    .filter((text) => text.length > 0)
                    .join(" - ")
                }
              </h2>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
