import React from "react";
import "./Panel.scss";

const Panel = (props) => {
  const title = /\d/.test(props.title) ? props.title + " letter words" : "Anagrams";
  return (
    <div className="Panel">
      <p className="panel-title">{title}</p>

      <div className="words">
        {props.data.map((entry, i) => (
          <span key={i}>{(i ? ", " : "") + entry}</span>
        ))}
      </div>

      {title === "Anagrams" && props.data.length === 0 && <div className="words">No anagrams found</div>}
    </div>
  );
};

export default Panel;
