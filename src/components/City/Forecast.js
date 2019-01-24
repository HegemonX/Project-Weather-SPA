import React from "react";
import "../style/weather.scss";
import WeatherUnit from "./WeatherUnit";
import { NavLink } from "react-router-dom";

function Forecast(props) {
  const [year, month, date] = props.dateRaw.split("-");
  const { woeid } = props;
  return (
    <div className="weather">
      <NavLink
        to={`/${woeid}/${year}/${month}/${date}/`}
        className="weather__date"
      >
        {props.date}
      </NavLink>
      <img
        className="weather__icon"
        src={props.imgSrc}
        alt={props.weatherTitle}
      />
      <div className="weather__title">{props.weatherTitle}</div>
      <WeatherUnit title={"Мин"}>{props.minTemp}</WeatherUnit>
      <WeatherUnit title={"Макс"}>{props.maxTemp}</WeatherUnit>
      <WeatherUnit title={"Ветер"} icon={props.windIcon}>
        {props.windSpeed}
      </WeatherUnit>
      {props.detail ? (
        <React.Fragment>
          <WeatherUnit title={"Влажность"}>{props.humidity}</WeatherUnit>
          <WeatherUnit title={"Давление"}>{props.pressure}</WeatherUnit>
          <WeatherUnit title={"Видимость"}>{props.visibility}</WeatherUnit>
          <WeatherUnit title={"Точность прогноза"}>
            {props.accuracy}
          </WeatherUnit>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default Forecast;
