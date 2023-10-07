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
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Vekt",
      selector: (row) => `${row.weight} ${row.weight_unit}`
    },
    {
      name: "Kalorier (kcal)",
      selector: (row) => row.calories,
      sortable: true
    },
    {
      name: "Protein (g)",
      selector: (row) => row.protein,
      sortable: true
    },
    {
      button: true,
      cell: (row) => (
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
    />
  );
}
