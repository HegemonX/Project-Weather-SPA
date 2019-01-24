import React from "react";
import "../style/City.scss";
import { processTemp, processDate } from "../../containers/ForecastContainer";
import { NavLink } from "react-router-dom";
import WeatherUnit from "./WeatherUnit";

export const processUpdated = date => {
  const parsed = new Date(date);
  const now = new Date();
  const time = (now - parsed) / (1000 * 3600);
  const hours = Math.floor(time);
  const minutes = Math.round((time % 1) * 60);

  return hours === 0
    ? `Обновлено ${minutes}м. назад`
    : hours > 3
    ? `Обновлено ${hours}ч. назад`
    : `Обновлено ${hours}ч. ${minutes}м. назад`;
};
export const processTime = date => {
  const parsed = new Date(date);
  let [hours, minutes] = [parsed.getHours(), parsed.getMinutes()];
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  return `${hours}:${minutes}`;
};

function CityHeader({ todayWeather, city, detail = false }) {
  const {
    created: updated,
    the_temp: temp,
    applicable_date: date
  } = todayWeather;
  const {
    title,
    time,
    woeid,
    sun_rise: sunRise,
    sun_set: sunSet,
    parent,
    timezone
  } = city;
  return (
    <header className="City__header">
      <NavLink to={`/${woeid}/`} className="City__title">
        {title}
      </NavLink>
      <span className="City__temp">{processTemp(temp)}</span>
      {detail ? (
        <React.Fragment>
          <div>Прогноз на {processDate(date)}</div>
          <div className="City__detail-info">
            <WeatherUnit title="">{parent ? parent.title : null}</WeatherUnit>
            <WeatherUnit title="Время">{processTime(time)}</WeatherUnit>
            <WeatherUnit title="Рассвет">{processTime(sunRise)}</WeatherUnit>
            <WeatherUnit title="Закат">{processTime(sunSet)}</WeatherUnit>
            <WeatherUnit title="Часовой пояс">{timezone}</WeatherUnit>
          </div>
        </React.Fragment>
      ) : (
        <div className="City__time">{processTime(time)}</div>
      )}
      <span className="City__updated">{processUpdated(updated)}</span>
      <div />
    </header>
  );
}

export default CityHeader;
