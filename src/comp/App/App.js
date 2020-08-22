import React, { Component } from "react";
import Panel from "../Panel/Panel";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      term: "",
      data: {},
      loading: "",
      speak: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.grabTheAnagrams = this.grabTheAnagrams.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.grabTheAnagrams();
    }
  }

  grabTheAnagrams() {
    this.setState({
      loading: "is-loading",
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
        this.setState({
          data: wdata,
          searched: true,
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.setState({
          loading: "",
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="head">
          <span>Anagram Solver</span>
        </div>
        <div className="search">
          <div className="search-box">
            <input onKeyDown={this.keyPress} value={this.state.term} className="input is-info is-large" onChange={this.handleChange} type="text" placeholder="enter a word" />
          </div>
          <div className="search-btn">
            <button disabled={!this.state.term} onClick={this.grabTheAnagrams} className={this.state.loading + " button is-info is-large"}>
              <span className="icon is-medium">
                <i className="fas fa-search"></i>
              </span>
              <span>Search</span>
            </button>
          </div>
        </div>
        {!this.state.searched && (
          <div className="placeholder">
            <p className="place-title">Anagrams</p>
            <p className="phonetic">/ˈanəˌɡram/</p>
            <p className="noun">noun</p>
            <p className="meaning">“a word or phrase made by using the letters of another word or phrase in a different order”</p>
            <p className="example">“Angel” is an anagram of “glean.”</p>
          </div>
        )}
        <div className="panels">
          {Object.keys(this.state.data)
            .reverse()
            .map((key, i) => (
              <Panel key={i} title={key} data={this.state.data[key]}></Panel>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
