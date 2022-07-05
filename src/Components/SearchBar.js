import React from "react";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@material-ui/core";

function SearchBar({ searchValue, handelChangeSearch }) {
  return (
    <div className="search-bar">
      <FormControl
        sx={{
          width: "100ch",
          borderRadius: "5px",
          backgroundColor: "#fff",
          borderBlockColor: "red",
        }}
      >
        <TextField
          sx={{ marginTop: 10 }}
          inputProps={{ sx: { backgroundColor: "#fff" } }}
          variant="outlined"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handelChangeSearch(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon onClick={() => "clicksearch"} />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </div>
  );
}

export default SearchBar;
