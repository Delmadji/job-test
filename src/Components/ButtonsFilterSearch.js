import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function ButtonsFilterSearch({ setButtonsSearchValue, setSearchValue }) {
  const [selectedBtn, setSelectedBtn] = useState(-1);

  //FUNCTION

  //set button value
  const handleClick = (e) => {
    setButtonsSearchValue(e.target.value);
  };

  //remove button value
  const handelRemove = () => {
    setSearchValue("");
    setSelectedBtn(-1);
    setButtonsSearchValue("");
  };
  return (
    <div className="buttons-filter-search">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{
          display: "flex",
          borderRadius: 1,
          justifyContent: "space-between",
        }}
      >
        <Button
          value="full_name"
          color={selectedBtn === 1 ? "secondary" : "primary"}
          onClick={(e) => {
            handleClick(e);
            setSelectedBtn(1);
          }}
        >
          full_name
        </Button>
        <Button
          value="phones"
          color={selectedBtn === 2 ? "secondary" : "primary"}
          onClick={(e) => {
            handleClick(e);
            setSelectedBtn(2);
          }}
        >
          phones
        </Button>
        <Button
          value="tracking_id"
          color={selectedBtn === 3 ? "secondary" : "primary"}
          onClick={(e) => {
            handleClick(e);
            setSelectedBtn(3);
          }}
        >
          tracking_id
        </Button>
        <Button value="clear" color="secondary" onClick={() => handelRemove()}>
          clear
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ButtonsFilterSearch;
