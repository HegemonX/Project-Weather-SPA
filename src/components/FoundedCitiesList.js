import React from "react";
import { NavLink } from "react-router-dom";
import FoundedCitiesFetchIcon from "./FoundedCitiesFetchIcon";

function FoundedCitiesList({ cities, query, listRef, isFetching }) {
  return (
    <ul className="founded-list founded-list_hidden" ref={listRef}>
      {isFetching ? (
        <FoundedCitiesFetchIcon />
      ) : cities.length > 0 ? (
        cities.map(city => (
          <li key={city.woeid} className="founded-list__item">
            <NavLink to={`/${city.woeid}/`} className="founded-list__link">
              {city.title}
            </NavLink>
          </li>
        ))
      ) : query ? (
        <li className="founded-list__not-found">Not found</li>
      ) : null}
    </ul>
  );
}

export default FoundedCitiesList;
