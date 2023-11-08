import FoodInfo from "./food-info";
import useSearchResults from "./use-search-results";
import styles from "./search-results.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import FoodItem, { foodItem } from "../../food-log/food-item";
import AddFoodPopup from "../add-food-popup/add-food-popup";
import { useEffect, useRef, useState } from "react";
import FoodInfoPopup from "../food-info-popup/food-info.popup";
import appropriateUnit from "../../misc/appropriate-unit";

interface SearchResultsProps {
  searchQuery: string;
}

const maxTextWidth = (chars: number, text: string): string =>
  text.substring(0, chars).trimEnd() + (chars < text.length ? "..." : "");

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const [foodInfoPopupOpen, setFoodInfoPopupOpen] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<FoodInfo | null>(null);

  const searchOptions = useSelector((state: RootState) => state.searchOption);

  const { foods, hasMoreFoodItems, loadMoreFoodItems } = useSearchResults(
    searchQuery,
    searchOptions
  );

  /* 
  Update height of scroll element when window is resized.
  Include breakpoint to prevent too large of a difference
  in starting height between scroll element and table element
  */
  const parentRef = useRef(null);
  const [height, setHeight] = useState(window.innerHeight);
  const breakpoint = 1200;

  useEffect(() => {
    const handleResizeWindow = () => setHeight(window.innerHeight);
    // Listen to window resize event
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // "Unlisten" to resize event
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  const scrollHeight = height > breakpoint ? height * 1 : height * 0.75;

  function foodInfoClicked(food: FoodInfo) {
    setSelectedFood(food);
    setFoodInfoPopupOpen(true);
  }

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
              <div className={styles.foodInfo} onClick={() => foodInfoClicked(food)}>
                <h1>{maxTextWidth(40, food.name)}</h1>
                <h2>
                  {
                    //Only puts " - " between the fields that are present.
                    [
                      food.brand,
                      appropriateUnit(food.defaultWeight, food.weightUnit),
                      `Protein: ${defaultWeightFoodItem.protein}g`,
                      `${defaultWeightFoodItem.calories}kcal`
                    ]
                      .filter((text) => text !== null && text.length > 0)
                      .join(" - ")
                  }
                </h2>
              </div>
            </div>
          );
        })}
        {selectedFood && (
          <FoodInfoPopup
            food={selectedFood}
            open={foodInfoPopupOpen}
            onClose={() => setFoodInfoPopupOpen(false)}
          />
        )}
      </InfiniteScroll>
    </div>
  );
}
