import Food from "./food";
import useSearchResults from "./use-search-results";
import styles from "./search-results.module.css";
import addImage from "../../../assets/add.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface SearchResultsProps {
  searchQuery: string;
}


export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const searchOptions = useSelector(((state:RootState) => state.searchOption));

  const { foodItems, hasMoreFoodItems, loadMoreFoodItems } =
  useSearchResults(searchQuery, searchOptions);

  return (
    <div className={styles.searchResults}>
      <InfiniteScroll
        initialScrollY={0}
        dataLength={foodItems.length}
        next={loadMoreFoodItems}
        loader={<p className={styles.loadingFoodItemsMessage}>Loading...</p>}
        hasMore={hasMoreFoodItems}
        className={styles.invisibleScrollbar}
        height={700}
      >
        {foodItems.map((food: Food) => (
          <div
            className={styles.foodItem}
            key={food.id}
            data-testid={`food-search-result-${food.id}`}
          >
            <img
              onClick={() => {
                console.log(`Added ${food.name}`);
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
                    `${food.weight}${food.weight_unit}`,
                    `Protein: ${food.protein}g`,
                    `${food.calories}kcal`
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
