import React, { Component } from "react";
import Panel from "../Panel/Panel";
import "./App.scss";
import PlaceHolder from "../PlaceHolder/PlaceHolder";

function App() {
  let searched = false;
  let term = "";
  let data = {};
  let loading = "";
  let speak = false;
  let warning = false;

  const handleChange = (e) => {
    term = e.target.value;
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      this.grabTheAnagrams();
    }
  };

  const grabTheAnagrams = () => {
    term = term.replace(/\s+/g, "");
    if (/^[A-Za-z]+$/.test(term)) {
      this.setState({
        loading: "is-loading",
        warning: false,
      });
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = "http://sanved.com/anagram-api?word=" + this.state.term;
      fetch(proxy + api, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      })
        .then((response) => response.json())
        .then((wdata) => {
          data = wdata;
          searched = true;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          loading = "";
        });
    } else {
      warning = true;
    }
  };

  return (
    <div className="App">
      <div className="head">
        <span>Anagram Solver</span>
      </div>
      <div className="search">
        <div className="search-box">
          <input maxlength="20" onKeyDown={keyPress} value={term} className="input is-info is-large" onChange={handleChange} type="text" placeholder="enter a word" />
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
      {warning && <div className="warning">Please only enter alphabets</div>}
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
