import { TableStyles } from "react-data-table-component";

export const foodLogTableStyles: TableStyles = {
  table: {
    style: {
      minHeight: "53.7vh",
      margin: "auto"
    }
  },
  headCells: {
    style: {
      fontWeight: 800,
      color: "#1E1E1E"
    }
  },
  rows: {
    style: {
      color: "#1E1E1E",
      fontSize: "1rem"
    },
    highlightOnHoverStyle: {
      color: "#1E1E1E",
      backgroundColor: "#C8E2FA"
    }
  },
  pagination: {
    style: {
      color: "#1E1E1E",
      margin: "auto",
      border: "none"
    }
  },
  header: {
    style: {
      fontSize: "1.5rem",
      margin: "auto",
      color: "#1E1E1E"
    }
  },
  headRow: {
    style: {
      fontSize: "1rem"
    }
  }
};
