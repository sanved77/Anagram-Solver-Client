import React, { useState } from "react";
import Panel from "../Panel/Panel";
import "./Main.scss";
import Search from "../Search/Search";
import PlaceHolder from "../PlaceHolder/PlaceHolder";

function App() {
  const [searched, setSearched] = useState(false);
  const [data, setData] = useState({});

  function setNewData(data) {
    setData(data);
  }

  function removePlaceHolder(searched) {
    setSearched(searched);
  }

  return (
    <div className="Main">
      <div className="head">
        <span>Anagram Solver</span>
      </div>
      <Search removePlaceHolder={removePlaceHolder} setNewData={setNewData}></Search>
      {!searched && <PlaceHolder></PlaceHolder>}
      <div className="panels">
        {Object.keys(data)
          .reverse()
          .map((key, i) => (
            <Panel key={i} title={key} data={data[key]}></Panel>
          ))}
      </div>
    </div>
  );
}

export default App;
