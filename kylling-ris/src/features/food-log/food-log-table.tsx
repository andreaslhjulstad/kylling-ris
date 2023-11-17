import DataTable, { TableColumn } from "react-data-table-component";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import styles from "./food-log-table.module.css";
import { foodLogTableStyles } from "./food-log-table-styles";
import { useDispatch, useSelector } from "react-redux";
import { removeFood } from "./food-log-reducer";
import FoodItem from "./food-item";
import { RootState } from "../../redux/store";
import appropriateUnit from "../misc/appropriate-unit";

export default function FoodLogTable() {
  const selectedFoodLog = useSelector(
    (state: RootState) => state.foodLog.selectedFoodLog
  );
  // 775px is the breakpoint for the compact version.
  const [compact, setCompact] = useState<boolean>(window.innerWidth <= 775);

  const dispatch = useDispatch();

  // Set the 'compact' state based on the window width
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 775) {
      setCompact(true);
    } else {
      setCompact(false);
    }
  });

  const nameColumn: TableColumn<FoodItem> = {
    name: "Navn",
    selector: (row) => row.name
  };

  const deleteButtonColumn: TableColumn<FoodItem> = {
    button: true,
    cell: (row) => (
      <button
        className={styles.deleteButton}
        onClick={() => {
          dispatch(removeFood({ id: row.id }));
        }}
      >
        <HiTrash className={styles.deleteIcon} strokeWidth={0} size={19} />
      </button>
    )
  };

  // Define the additional columns that are specific to the non-compact version
  const additionalColumns: TableColumn<FoodItem>[] = [
    {
      name: "Vekt",
      selector: (row) => appropriateUnit(row.weight, row.weightUnit)
    },
    {
      name: "Kalorier (kcal)",
      selector: (row) => row.calories
    },
    {
      name: "Protein (g)",
      selector: (row) => row.protein
    }
  ];

  // Construct the columns array based on the 'compact' condition
  // If compact, only use the name and delete button columns
  // Otherwise, include the additional columns as well
  const columns: TableColumn<FoodItem>[] = compact
    ? [nameColumn, deleteButtonColumn]
    : [nameColumn, ...additionalColumns, deleteButtonColumn];

  const ExpandedRowComponent = ({ data: food }: { data: FoodItem }) => (
    <div className={styles.expandedRow}>
      <p>
        Vekt: {food.weight}
        {food.weightUnit}
      </p>
      <p>Kalorier (kcal): {food.calories}</p>
      <p>Protein (g): {food.protein}</p>
    </div>
  );

  return (
    <div>
      <div className={styles.totals}>
        <h2 className={styles.totalCalories}>
          Kalorier:{" "}
          {Math.round(
            selectedFoodLog.reduce((total, food) => total + food.calories, 0) *
              10
          ) / 10}
          kcal
        </h2>
        <h2 className={styles.totalProtein}>
          Protein:{" "}
          {Math.round(
            selectedFoodLog.reduce((total, food) => total + food.protein, 0) *
              10
          ) / 10}
          g
        </h2>
      </div>
      <DataTable
        columns={columns}
        data={selectedFoodLog}
        customStyles={foodLogTableStyles}
        pagination
        expandableRows={compact}
        expandOnRowClicked
        expandableRowsComponent={ExpandedRowComponent}
        paginationComponentOptions={{ noRowsPerPage: true }}
        responsive
        noDataComponent={
          <p className={styles.placeholder}>
            Du har ikke lagt til noe mat enda, gjør et søk og trykk på
            '+'-knappen for å legge til noe
          </p>
        }
      />
    </div>
  );
}
