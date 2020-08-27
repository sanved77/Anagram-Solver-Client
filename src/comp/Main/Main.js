import React, { useState } from "react";
import ReactGA from "react-ga";

import Panel from "../Panel/Panel";
import "./Main.scss";
import Search from "../Search/Search";
import PlaceHolder from "../PlaceHolder/PlaceHolder";

const Main = () => {
  const [searched, setSearched] = useState(false);
  const [data, setData] = useState({});

  ReactGA.initialize("UA-176575804-1");
  ReactGA.pageview("/app");

  const setNewData = (data) => setData(data);

  const removePlaceHolder = (searched) => setSearched(searched);

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
};

export default Main;
