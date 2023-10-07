import styles from "./filter-option-popup.module.css";

export default function FilterOptionPopup() {
  return (
    <div className={styles.filterOptionsWrapper}>
      <div className={styles.title}>Alternativer</div>
      <select className={styles.dropdown} name="sort">
        <option value="protein-ascending">Proteiner (stigene)</option>
        <option value="protein-descending">Proteiner (synkene)</option>
        <option value="kcal-ascending">kalorier (stigene)</option>
        <option value="kcal-descending">kalorier (synkene)</option>
      </select>
      <label>Gluten</label>
      <input type="checkbox" name="Gluten" id="Gluten" />
      <label>Melk</label>
      <input type="checkbox" name="Melk" id="Melk" />
      <label>Soya</label>
      <input type="checkbox" name="Soya" id="Soya" />
    </div>
  );
}
