import FoodInfo from "../search-results/food-info";
import styles from "./food-info-popup.module.css"
import { Dialog }from "primereact/dialog"

interface FoodInfoPopupProps {
  food: FoodInfo;
  open: boolean;
  onClose: () => void;
}

export default function FoodInfoPopup({
  food,
  open,
  onClose
}: FoodInfoPopupProps) {


  
  const expandedFood = {
    ...food,
    image: "https://bilder.ngdata.no/7035620014215/kmh/large.jpg",
    ingredients: "Kyllingfilet 87 %, Vann 12 %, Salt, Dekstrose (Mais), Maltodekstrin (Mais), Potetfiber og Fortykningsmiddel E415",
    relativeCarbs: 0,
    relativeFat: 0,
    relativeSaturatedFat: 0,
    relativeFiber: 0,
    relativeSalt: 0,
    relativeSugars: 0,
    allergens: ["Melk", "Egg", "Bløtdyr"]
  };

  const nutrients = {
    "Kalorier": `${expandedFood.relativeCalories} kcal`,
    "Protein": `${expandedFood.relativeProtein} g`,
    "Karbohydrater": `${expandedFood.relativeCarbs} g`,
    "Fett": `${expandedFood.relativeFat} g`,
    "Mettet fett": `${expandedFood.relativeSaturatedFat} g`,
    "Sukkerarter": `${expandedFood.relativeSugars} g`,
    "Fiber": `${expandedFood.relativeFiber} g`,
    "Salt": `${expandedFood.relativeSalt} g`,
  };

  return (
    <div>
      <Dialog
        className={styles.foodInfoPopup}
        visible={open}
        onHide={onClose}
        header={`${expandedFood.name} ${expandedFood.defaultWeight}${expandedFood.weightUnit} ${expandedFood.brand && ("- " + expandedFood.brand)}`}
        headerClassName={styles.header}
        headerStyle={ { fontWeight: 800, fontSize: "2rem" }  }
        draggable={false}
        dismissableMask={true}
        closable={false}
        resizable={false}
      >
        <div className={styles.content}>
          <div className={styles.foodDetails}>
            <div>
              <img src={expandedFood.image} width={160} alt={expandedFood.name} />
            </div>
            <div>
              <h4>Ingredienser:</h4>
              <p>{expandedFood.ingredients}</p>
              <h4>Allergener:</h4>
              <p>{expandedFood.allergens.join(", ")}</p>
            </div>
          </div>
          <div>
            <h4>Næringsinnhold pr. 100g:</h4>
            <div className={styles.nutrients}>
              {Object.entries(nutrients).map(([nutrient, value]) => (
                <div className={styles.nutrient} key={nutrient}>
                  <span>{nutrient}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>Lukk</button>
        </div>
      </Dialog>
    </div>
  );
}
