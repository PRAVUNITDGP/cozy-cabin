import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";


export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "all" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          {value: "name-asc", label: "Sort By Name (A-Z)"},
          {value: "name-desc", label: "Sort By Name (Z-A)"},
          {value: "regularPrice-asc", label: "Sort By Price(low First)"},
          {value: "regularPrice-desc", label: "Sort By Name (high First)"},
          {value: "maxCapacity-asc", label: "Sort By Name (Low First)"},
          {value: "maxCapacity-desc", label: "Sort By Name (high First)"},
        ]}
      />
    </TableOperations>

  );
}
