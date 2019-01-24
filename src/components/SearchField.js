import React from "react";
import "./style/SearchField.scss";

function SearchField({ onChange, onFocus, onBlur, children }) {
  return (
    <div className="SearchField">
      <input
        type="text"
        className="SearchField__input"
        placeholder="Найти город..."
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {children}
    </div>
  );
}

export default SearchField;
