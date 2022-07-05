import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginationdata({
  page,
  setPage,
  pageNumber,
  setPageNumber,
}) {
  const handelChange = (val) => {
    if (val > pageNumber) {
      setPageNumber(1);
      console.log(pageNumber);
      setPage(1);
    }
    console.log(page);
    console.log(val);
    setPage(val);
    console.log(page);
  };
  return (
    <Stack spacing={6}>
      <Pagination
        onChange={(e) => {
          handelChange(e.target.textContent);
        }}
        count={pageNumber}
        variant="outlined"
      />
    </Stack>
  );
}
