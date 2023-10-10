import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./search-option-popup.module.css";
import { changeSort, setAllergens } from "./search-option-reducer";
import { RootState } from "../../../redux/store";

interface AllergenIsShown {
  [allergen: string]: boolean;
}

const allergensNotShown = (allergenIsAlloweds: AllergenIsShown): string[] => {
  return Object.entries(allergenIsAlloweds)
    .filter(([_, isShowing]) => !isShowing)
    .map(([allergen, _]) => allergen);
};

export default function FilterOptionPopup() {
  const { sortOption, allergens } = useSelector(
    (state: RootState) => state.searchOption
  );

  const dispatch = useDispatch();
  
  const [allergenIsAllowed, setAllergenIsAllowed] = useState<AllergenIsShown>({
    Gluten: !allergens.includes("Gluten"),
    Melk: !allergens.includes("Melk"),
    Soya: !allergens.includes("Soya")
  });

  const handleSortChange = (e: any) => {
    dispatch(changeSort(e.target.value));
  };

  useEffect(() => {
    dispatch(setAllergens(allergensNotShown(allergenIsAllowed)));
  }, [allergenIsAllowed]);

  return (
    <div>
      <div className={styles.filterContent}>
        <div className={styles.title}>Filter</div>

        <select
          className={styles.dropdown}
          name="sort"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="name-ascending">Navn a-z</option>
          <option value="name-descending">Navn z-a</option>
          <option value="protein-ascending">Proteiner (stigende)</option>
          <option value="protein-descending">Proteiner (synkende)</option>
          <option value="kcal-ascending">Kalorier (stigende)</option>
          <option value="kcal-descending">Kalorier (synkende)</option>
        </select>

        <div className={styles.labelCheckboxContainer}>
          <label>Vis Gluten</label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="Gluten"
            id="Gluten"
            checked={allergenIsAllowed["Gluten"]}
            onChange={() =>
              setAllergenIsAllowed((allergenIsAllowed) => ({
                ...allergenIsAllowed,
                Gluten: !allergenIsAllowed["Gluten"]
              }))
            }
          />
        </div>

        <div className={styles.labelCheckboxContainer}>
          <label>Vis Melk</label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="Melk"
            id="Melk"
            checked={allergenIsAllowed["Melk"]}
            onChange={() =>
              setAllergenIsAllowed((allergenIsAllowed) => ({
                ...allergenIsAllowed,
                Melk: !allergenIsAllowed["Melk"]
              }))
            }
          />
        </div>

        <div className={styles.labelCheckboxContainer}>
          <label>Vis Soya</label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="Soya"
            id="Soya"
            checked={allergenIsAllowed["Soya"]}
            onChange={() =>
              setAllergenIsAllowed((allergenIsAllowed) => ({
                ...allergenIsAllowed,
                Soya: !allergenIsAllowed["Soya"]
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
