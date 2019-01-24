import React from "react";
import "../style/weather.scss";

function WeatherUnit({ title, children: unit, icon = null, unitClass = null }) {
  return (
    <div className="weather__weather-unit">
      <span className="weather-unit__title">{`${title}`}</span>
      {icon}
      <div className={`weather-unit__measure ${unitClass}`}>{`${unit}`}</div>
    </div>
  );
}

export default WeatherUnit;
