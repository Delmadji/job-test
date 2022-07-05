import "./App.css";
import StatsCard from "./Components/StatsCard";
import { useEffect, useState } from "react";
import Table from "./Components/Table";
import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkzNjMwMDlmMTI3ODUwZDllYjE2ZWMiLCJuYW1lIjoiaGFtemEgaGFvdWkiLCJyb2xlIjoic2VsbGVyIiwicGVybWlzc2lvbnMiOltdLCJleHAiOjE2NTkzNDY1MzkuMjQxLCJpYXQiOjE2NTQxNjI1Mzl9.b9TkN02qafmGtYmwEcpfxJrQJVvBRZuPRKe-FQCchL8";

const api = "https://call-center-yalitech.herokuapp.com/orders/stats";

function App() {
  const [statusData, setStatusData] = useState([]);
  const [pendingDesc, setPendingDesc] = useState(0);
  const [confirmDesc, setConfirmDesc] = useState(0);

  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setStatusData(res.data);
        setPendingDesc(res.data[0].pending);
        setConfirmDesc(res.data[0].confirmed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h2>call center </h2>
      <div className="status-show-div">
        <StatsCard title="pending" description={pendingDesc} />
        <StatsCard title="confirmed" description={confirmDesc} />
      </div>
      <div className="table-data">
        <Table
          setConfirmDesc={setConfirmDesc}
          setPendingDesc={setPendingDesc}
          pendingDesc={pendingDesc}
          confirmDesc={confirmDesc}
        />
      </div>
    </div>
  );
}

export default App;
