import React from "react";
import "../style/ForecastHistory.scss";
import WeatherUnit from "./WeatherUnit";
import { NavLink } from "react-router-dom";

const makeURLFromDate = dateStr => {
  const parsed = new Date(dateStr);
  const year = parsed.getFullYear();
  const month = parsed.getMonth() + 1;
  const date = parsed.getDate();
  return `${year}/${month}/${date}`;
};

function ForecastRow(props) {
  const dateURL = makeURLFromDate(props.createdRaw);
  const { woeid } = props.params;
  return (
    <React.Fragment>
      <td className="ForecastHistory__created">
        <NavLink to={`/${woeid}/${dateURL}/`} className="weather__date">
          {props.createdDate}
        </NavLink>
        <div>{props.createdTime}</div>
      </td>
      <td className="ForecastHistory__weather">
        <img
          className="ForecastHistory__icon"
          alt={props.weatherTitle}
          src={props.imgSrc}
        />
        <div className="ForecastHistory__title">{props.weatherTitle}</div>
      </td>
      <td>{props.temp}</td>
      <td>{props.minTemp}</td>
      <td>{props.maxTemp}</td>
      <td className="ForecastHistory__wind">
        <WeatherUnit title={""} icon={props.windIcon}>
          {props.windSpeed}
        </WeatherUnit>
      </td>
      {props.detail ? (
        <React.Fragment>
          <td>{props.humidity}</td>
          <td>{props.pressure}</td>
          <td>{props.visibility}</td>
          <td>{props.accuracy}</td>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default ForecastRow;
