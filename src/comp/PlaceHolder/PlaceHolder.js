import React from "react";
import "./PlaceHolder.scss";

const PlaceHolder = () => {
  return (
    <div className="placeholder">
      <p className="place-title">Anagrams</p>
      <p className="phonetic">/ˈanəˌɡram/</p>
      <p className="noun">noun</p>
      <p className="meaning">“a word or phrase made by using the letters of another word or phrase in a different order”</p>
      <p className="example">“Angel” is an anagram of “glean.”</p>
    </div>
  );
};

export default PlaceHolder;
