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

const ALLERGENS = [
  "Gluten",
  "Melk",
  "Egg",
  "Soya",
  "Sulfitt",
  "Fisk",
  "Skalldyr",
  "Sesam",
  "Selleri",
  "Sennep",
  "Nøtter",
  "Peanøtter"
];

export default function FilterOptionPopup() {
  const [showAllergens, setShowAllergens] = useState(false);
  const { sortOption, allergens } = useSelector(
    (state: RootState) => state.searchOption
  );
  const dispatch = useDispatch();

  const [allergenIsAllowed, setAllergenIsAllowed] = useState<AllergenIsShown>(
    ALLERGENS.reduce(
      (acc, allergen) => ({
        ...acc,
        [allergen]: !allergens.includes(allergen)
      }),
      {}
    )
  );

  useEffect(() => {
    dispatch(setAllergens(allergensNotShown(allergenIsAllowed)));
  }, [allergenIsAllowed, dispatch]);

  return (
    <div>
      <div className={styles.filterContent}>
        <div className={styles.title}>Filtrer og sorter</div>

        <select
          className={styles.dropdown}
          name="sort"
          value={sortOption}
          onChange={({ target: { value: sort } }) => {
            dispatch(changeSort(sort));
          }}
        >
          <option value="name-ascending">Navn a-å</option>
          <option value="name-descending">Navn å-a</option>
          <option value="protein-ascending">
            Proteiner pr. 100g/ml (stigende)
          </option>
          <option value="protein-descending">
            Proteiner pr. 100g/ml (synkende)
          </option>
          <option value="kcal-ascending">
            Kalorier pr. 100g/ml (stigende)
          </option>
          <option value="kcal-descending">
            Kalorier pr. 100g/ml (synkende)
          </option>
        </select>

        <button
          className={styles.button}
          onClick={() => setShowAllergens(!showAllergens)}
        >
          {showAllergens ? "Gjem allergener" : "Vis allergener"}
        </button>

        {showAllergens && (
          <div className={styles.allergensOptions}>
            {ALLERGENS.map((allergen) => (
              <div key={allergen} className={styles.labelCheckboxContainer}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name={allergen}
                  id={allergen}
                  checked={allergenIsAllowed[allergen]}
                  onChange={() =>
                    setAllergenIsAllowed((prev) => ({
                      ...prev,
                      [allergen]: !prev[allergen]
                    }))
                  }
                />
                <label>Inneholder {allergen.toLowerCase()}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
