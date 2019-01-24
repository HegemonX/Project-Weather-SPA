import React from "react";
import SearchFieldContainer from "../containers/SearchFieldContainer";

function Title() {
  return (
    <div className="Title">
      <h1 className="Title__title">Погода</h1>
      <SearchFieldContainer />
    </div>
  );
}

export default Title;
