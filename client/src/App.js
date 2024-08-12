import react, { Component, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./App.css";

function App() {
  const [state, setState] = useState({
    name: "",
    recieptId: 0,
    price1: 0,
    price2: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };
  const createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Reciept ID"
        name="recieptId"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 1"
        name="price1"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 2"
        name="price2"
        onChange={handleChange}
      />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
