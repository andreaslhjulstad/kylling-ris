import { useSelector, useDispatch } from "react-redux";
import styles from "./search-option-popup.module.css";
import { useState } from "react";
import { changeSort, toggleGluten, toggleMilk, toggleSoya } from "./search-option-reducer";
import { RootState } from "../../../redux/store";

export default function FilterOptionPopup() {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  const searchOptions = useSelector((state: RootState) => state.searchOption);
  const dispatch = useDispatch();
  const handleSortChange = (e:any) => {
    dispatch(changeSort(e.target.value));
  };

  return (
    <>
      {modal && (
        <div>
          <div className={styles.overlay} onClick={toggleModal}></div>
          <div className={styles.filterContent}>
            <div className={styles.title}>Filter</div>

            <select
              className={styles.dropdown}
              name="sort"
              value={searchOptions.sortOption}
              onChange={handleSortChange}
            >
              <option value="name-ascending">Navn a-z</option>
              <option value="name-descending">Navn z-a</option>
              <option value="protein-ascending">Proteiner (stigene)</option>
              <option value="protein-descending">Proteiner (synkene)</option>
              <option value="kcal-ascending">Kalorier (stigene)</option>
              <option value="kcal-descending">Kalorier (synkene)</option>
            </select>

            <div className={styles.labelCheckboxContainer}>
              <label>Vis Gluten</label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="Gluten"
                id="Gluten"
                checked={searchOptions.showGluten}
                onClick={() => dispatch(toggleGluten())}
              />
            </div>

            <div className={styles.labelCheckboxContainer}>
              <label>Vis Melk</label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="Melk"
                id="Melk"
                checked={searchOptions.showMilk}
                onClick={() => dispatch(toggleMilk())}
              />
            </div>

            <div className={styles.labelCheckboxContainer}>
              <label>Vis Soya</label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="Soya"
                id="Soya"
                checked={searchOptions.showSoya}
                onClick={() => dispatch(toggleSoya())}
              />
            </div>

            <button className={styles.saveOptionsButton} onClick={toggleModal}>
              Lagre
            </button>
          </div>
        </div>
      )}
    </>
  );
}
