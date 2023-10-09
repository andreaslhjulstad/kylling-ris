import DataTable, { TableColumn } from "react-data-table-component";
import Food from "../food-search/search-results/food";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import styles from "./food-log-table.module.css";
import { foodLogTableStyles } from "./food-log-table-styles";

interface FoodLogTableProps {
  loggedFoods: Food[];
}

export default function FoodLogTable({ loggedFoods }: FoodLogTableProps) {
  const [data, setData] = useState<Food[]>(loggedFoods);

  const columns: TableColumn<Food>[] = [
    {
      name: "Navn",
      selector: (row) => row.name
    },
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
    },
    {
      button: true, // Special formatting for button column
      cell: (row) => ( // Renders a button with a trash icon in the cell
        <button
          className={styles.deleteButton}
          onClick={() => handleDelete(row.id)}
        >
          <FiTrash2 className={styles.deleteIcon} />
        </button>
      )
    }
  ];

  const handleDelete = (id: number) => {
    setData(data.filter((food) => food.id !== id));
  };

  return (
    <DataTable
      title="Logget mat"
      columns={columns}
      data={data}
      customStyles={foodLogTableStyles}
      pagination
      paginationComponentOptions={{ noRowsPerPage: true }}
      highlightOnHover
      responsive
      noDataComponent={
        <p className={styles.placeHolder}>
          Du har ikke lagt til noe mat enda, gjør et søk til venstre og trykk på
          '+'-knappen for å legge til noe
        </p>
      }
    />
  );
}
