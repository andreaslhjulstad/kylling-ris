import SearchResults from "./search-results/search-results";
import { useState } from "react";
import styles from "./food-search.module.css";
import searchIcon from "../../assets/search-icon.png";

import filter from "../../assets/filter.png";
import FilterOptionPopup from "./search-options/search-option-popup";

import { Popover } from "@headlessui/react";

export default function FoodSearch() {
  //What the user has entered in the search field.
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className={styles.foodSearch}>
      <div className={styles.searchBar}>
        <img
          src={searchIcon}
          className={styles.searchIcon}
          data-testid="search-bar"
        />
        <input
          placeholder="Search"
          value={searchInput}
          onChange={({ target: { value: searchInput } }) => {
            setSearchInput(searchInput);
          }}
        />
        <Popover>
          <Popover.Button className={styles.filterButton}>
            <img src={filter} className={styles.filterImage} />
          </Popover.Button>
          <Popover.Panel>
              <FilterOptionPopup />
          </Popover.Panel>
        </Popover>
      </div>
      <SearchResults searchQuery={searchInput} />
    </div>
  );
}
