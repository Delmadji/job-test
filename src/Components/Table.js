import MaterialTable from "material-table";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Showinfo from "./Showinfo";
import "./Table.css";
import Paginationdata from "./Pginationdata";
import SearchBar from "./SearchBar";
import ButtonsFilterSearch from "./ButtonsFilterSearch";
import SelectPageSize from "./SelectPageSize";

function Table({ setConfirmDesc, confirmDesc, setPendingDesc, pendingDesc }) {
  const [clientInformation, setClientInformation] = useState();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [openShowinfo, setOpenShowinfo] = useState(false);
  const [count, setCount] = useState(5);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(4);
  const [searchValue, setSearchValue] = useState("");
  const [buttonsSearchValue, setButtonsSearchValue] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const columns = [
    { title: "Tracking", field: "tracking_id" },
    {
      title: "Status",
      field: "last_status",
      render: (params) => {
        return <div className={params.last_status}>{params.last_status}</div>;
      },
    },
    { title: "Customer", field: "client.full_name" },
    { title: "Phone", field: "client.phones[0]", hidden: true },
    { title: "Product", field: "products[0].name" },
    { title: "Address", field: "destination.city_name" },
  ];

  //functions

  const handelChangeSearch = (e) => {
    setSearchValue("");
    setSearchValue(e.target.value);
    search(buttonsSearchValue, e.target.value);
  };

  const handleConfirmed = (data) => {
    data.last_status = "confirmed";
    setPendingDesc((pendingDesc -= 1));
    setConfirmDesc((confirmDesc += 1));

    setOpenShowinfo(false);
    return data.last_status;
  };

  function search(eventValue, searchValue) {
    if (searchValue === "") {
      setCount(5);
      setFilterSearch("");
    } else {
      switch (eventValue) {
        case "full_name":
          setFilterSearch(`full_name=${searchValue}`);
          break;
        case "phones":
          setFilterSearch(`phone=${searchValue}`);
          break;
        case "tracking_id":
          setFilterSearch(`tracking_id=${searchValue}`);
          break;
        default:
          setFilterSearch(``);
      }
    }
  }

  let api;
  if (searchValue === "") {
    api = `https://call-center-yalitech.herokuapp.com/orders?count=${count}&page=${page}&status=confirmed&${filterSearch}`;
  } else {
    api = `https://call-center-yalitech.herokuapp.com/orders?${filterSearch}`; //when i need to search for all items
  }

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkzNjMwMDlmMTI3ODUwZDllYjE2ZWMiLCJuYW1lIjoiaGFtemEgaGFvdWkiLCJyb2xlIjoic2VsbGVyIiwicGVybWlzc2lvbnMiOltdLCJleHAiOjE2NTkzNDY1MzkuMjQxLCJpYXQiOjE2NTQxNjI1Mzl9.b9TkN02qafmGtYmwEcpfxJrQJVvBRZuPRKe-FQCchL8";
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setData(res.data.items);
        setPageNumber(res.data.pagination.pages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [api, count, page]);

  return (
    <div>
      {/* Show client information */}
      {show ? (
        <Showinfo
          openShowinfo={openShowinfo}
          setOpenShowinfo={setOpenShowinfo}
          clientInformation={clientInformation}
          handleConfirmed={handleConfirmed}
        />
      ) : (
        ""
      )}
      <div className="search-bar-section">
        <ButtonsFilterSearch
          buttonsSearchValue={buttonsSearchValue}
          setButtonsSearchValue={setButtonsSearchValue}
          setSearchValue={setSearchValue}
        />
        <SearchBar
          searchValue={searchValue}
          handelChangeSearch={handelChangeSearch}
        />
      </div>

      <MaterialTable
        data={data}
        columns={columns}
        editable={{
          onRowUpdate: () => (newData) => null,
          onRowDelete: () => (newData) => null,
        }}
        actions={[
          {
            icon: () => (
              <VisibilityIcon className="showDataIcon"></VisibilityIcon>
            ),
            tooltip: "show data",
            onClick: (event, rowData) => {
              setClientInformation(rowData);
              setOpenShowinfo(true);
              setShow(true);

              return clientInformation;
            },
          },
        ]}
        options={{
          headerStyle: { background: "rgb(216, 216, 216)", fontWeight: "800" },
          actionsColumnIndex: -1,
          paging: false,
          filtering: false,
          search: false,
          showTitle: false,
        }}
      />
      <div className="pagination">
        <Paginationdata
          page={page}
          setPage={setPage}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        <SelectPageSize
          count={count}
          setCount={setCount}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}

export default Table;
