import SearchResults from "./search-results/search-results";
import { useState } from "react";
import styles from "./food-search.module.css";
import searchIcon from "../../assets/search-icon.png";

import cogwheel from "../../assets/cogwheel.png";
import Popup from 'reactjs-popup';
import FilterOptionPopup from "./search-options/search-option-popup";

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
        <Popup 
          trigger={<img src={cogwheel} className={styles.cogwheel}/>} 
          modal>
          {<FilterOptionPopup/>}
        </Popup>
      </div>
      <SearchResults searchQuery={searchInput} />
    </div>
  );
}
