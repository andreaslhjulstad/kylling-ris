import SearchResults from "./search-results/search-results";
import { useState } from "react";
import styles from "./food-search.module.css";
import { IoSearch } from "react-icons/io5";

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import FilterOptionPopup from "./search-options/search-option-popup";

import { Popover, Transition } from "@headlessui/react";

export default function FoodSearch() {
  //What the user has entered in the search field.
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className={styles.foodSearch}>
      <div className={styles.searchBar}>
        <IoSearch
          size={40}
          className={styles.searchIcon}
          data-testid="search-bar"
        />
        <input
          placeholder="Søk"
          aria-label="Søk"
          value={searchInput}
          onChange={({ target: { value: searchInput } }) => {
            setSearchInput(searchInput);
          }}
          data-testid="search-bar"
        />
        <Popover className={styles.filterWrapper}>
          <Popover.Button className={styles.filterButton} aria-label="Filter">
            <HiOutlineAdjustmentsHorizontal
              className={styles.filterImage}
              size={40}
            />
          </Popover.Button>
          <Transition
            enter={styles.enter}
            enterFrom={styles.enterFrom}
            enterTo={styles.enterTo}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <Popover.Panel>
              <FilterOptionPopup />
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
      <SearchResults searchQuery={searchInput} />
    </div>
  );
}
