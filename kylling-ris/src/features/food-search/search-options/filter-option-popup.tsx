import styles from "./filter-option-popup.module.css";
import { useState } from "react";

export default function FilterOptionPopup() {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <div>
          <div className={styles.overlay} onClick={toggleModal}></div>
          <div className={styles.filterContent}>
            <div className={styles.title}>Filter</div>

            <select className={styles.dropdown} name="sort">
              <option value="name-ascending">Navn a-z</option>
              <option value="name-descending">Navn z-a</option>
              <option value="protein-ascending">Proteiner (stigene)</option>
              <option value="protein-descending">Proteiner (synkene)</option>
              <option value="kcal-ascending">kalorier (stigene)</option>
              <option value="kcal-descending">kalorier (synkene)</option>
            </select>

            <div className={styles.labelCheckboxContainer}>
              <label>Gluten</label>
              <input className={styles.checkbox} type="checkbox" name="Gluten" id="Gluten" />
            </div>

            <div className={styles.labelCheckboxContainer}>
              <label>Melk</label>
              <input className={styles.checkbox} type="checkbox" name="Melk" id="Melk" />
            </div>

            <div className={styles.labelCheckboxContainer}>
              <label>Soya</label>
              <input className={styles.checkbox} type="checkbox" name="Soya" id="Soya" />
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
