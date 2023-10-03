import Food from "./food";
import useSearchResults from "./use-search-results";
import styles from "./search-results.module.css";
import addImage from "../../../assets/add.png";
import InfiniteScroll from "react-infinite-scroll-component";

interface SearchResultsProps {
  searchQuery: string;
}

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const { foodItems, hasMoreFoodItems, loadMoreFoodItems } =
    useSearchResults(searchQuery);

  return (
    <div className={`${styles.searchResults} ${styles.invisibleScrollbar}`}>
      <InfiniteScroll
        dataLength={foodItems.length}
        next={loadMoreFoodItems}
        loader={<p className={styles.loadingFoodItemsMessage}>Loading...</p>}
        hasMore={hasMoreFoodItems}
        height={700}
      >
        {foodItems.map((food: Food) => (
          <div className={styles.foodItem} key={food.id}>
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
