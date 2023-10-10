import DataTable, { TableColumn } from "react-data-table-component";
import Food from "../food-search/search-results/food";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import styles from "./food-log-table.module.css";
import { foodLogTableStyles } from "./food-log-table-styles";

interface FoodLogTableProps {
  loggedFoods: Food[];
}

export default function FoodLogTable({ loggedFoods }: FoodLogTableProps) {
  const [data, setData] = useState<Food[]>(loggedFoods);
  const [compact, setCompact] = useState(window.innerWidth <= 775); // 775px is the breakpoint for the compact version

  // Set the 'compact' state based on the window width
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 775) {
      setCompact(true);
    } else {
      setCompact(false);
    }
  });

  const nameColumn: TableColumn<Food> = {
    name: "Navn",
    selector: (row) => row.name
  };

  const deleteButtonColumn: TableColumn<Food> = {
    button: true,
    cell: (row) => (
      <button
        className={styles.deleteButton}
        onClick={() => handleDelete(row.id)}
      >
        <HiTrash className={styles.deleteIcon} stroke-width={0} size={19} />
      </button>
    )
  };

  // Define the additional columns that are specific to the non-compact version
  const additionalColumns: TableColumn<Food>[] = [
    {
      name: "Vekt",
      selector: (row) => `${row.weight} ${row.weight_unit}`
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
  const columns: TableColumn<Food>[] = compact
    ? [nameColumn, deleteButtonColumn]
    : [nameColumn, ...additionalColumns, deleteButtonColumn];

  const handleDelete = (id: number) => {
    setData(data.filter((food) => food.id !== id));
  };

  const ExpandedRowComponent = ({ data }: { data: Food }) => (
    <div className={styles.expandedRow}>
      <p>
        Vekt: {data.weight}
        {data.weight_unit}
      </p>
      <p>Kalorier (kcal): {data.calories}</p>
      <p>Protein (g): {data.protein}</p>
    </div>
  );

  return (
    <div>
      <h1 className={styles.header}>Logget mat</h1>
      <div className={styles.totals}>
        <h2 className={styles.totalCalories}>
          Totale kalorier:{" "}
          {Math.round(
            data.reduce((total, food) => total + food.calories, 0) * 10
          ) / 10}
          kcal
        </h2>
        <h2 className={styles.totalProtein}>
          Total protein:{" "}
          {Math.round(
            data.reduce((total, food) => total + food.protein, 0) * 10
          ) / 10}
          g
        </h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        customStyles={foodLogTableStyles}
        pagination
        expandableRows={compact}
        expandOnRowClicked
        expandableRowsComponent={ExpandedRowComponent}
        paginationComponentOptions={{ noRowsPerPage: true }}
        highlightOnHover
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
