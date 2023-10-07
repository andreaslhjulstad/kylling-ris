import { TableStyles } from "react-data-table-component";

export const foodLogTableStyles: TableStyles = {
  tableWrapper: {
    style: {
      fontFamily: "inherit",
      border: "none"
    }
  },
  table: {
    style: {
      maxWidth: "60%",
      maxHeight: "486px",
      minHeight: "486px",
      margin: "auto",
      border: "1px solid white"
    }
  },
  headCells: {
    style: {
      fontWeight: 800,
      color: "#1e1e1e"
    }
  },
  rows: {
    style: {
      color: "#1e1e1e"
    },
    highlightOnHoverStyle: {
      color: "#1e1e1e",
      backgroundColor: "#C8E2FA"
    }
  },
  pagination: {
    style: {
      color: "#1e1e1e",
      maxWidth: "60%",
      margin: "auto",
      border: "none"
    }
  },
  header: {
    style: {
      maxWidth: "60%",
      margin: "auto"
    }
  }
};
