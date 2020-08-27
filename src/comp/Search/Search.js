import React, { useState } from "react";
import ReactGA from "react-ga";

import "./Search.scss";
import { getAnagrams } from "../../api/getAnagrams";

const Search = (props) => {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState("");
  const [warning, setWarning] = useState(false);

  const handleChange = (e) => setTerm(e.target.value);

  const keyPress = ({ keyCode }) => {
    if (keyCode === 13) grabTheAnagrams();
  };

  const grabTheAnagrams = () => {
    let trimmedTerm = term.replace(/\s/, "");
    if (/^[A-Za-z]+$/.test(trimmedTerm)) {
      setLoading("is-loading");
      setWarning(false);
      getAnagrams(trimmedTerm)
        .then((response) => response.json())
        .then((wdata) => {
          props.setNewData(wdata);
          props.removePlaceHolder(true);
          ReactGA.event({
            category: "Search",
            action: trimmedTerm,
          });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading("");
        });
    } else {
      setWarning(true);
    }
  };

  return (
    <div>
      <div className="search">
        <div className="search-box">
          <input value={term} onKeyDown={keyPress} onChange={handleChange} className="input is-info is-large" type="text" placeholder="enter a word" maxLength="20" />
        </div>
        <div className="search-btn">
          <button disabled={!term} onClick={grabTheAnagrams} className={loading + " button is-info is-large"}>
            <span className="icon is-medium">
              <i className="fas fa-search"></i>
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>
      {warning && <div className="warning">Please only enter alphabets without spaces</div>}
    </div>
  );
};

export default Search;
