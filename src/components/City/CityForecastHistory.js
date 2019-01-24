import React from "react";
import CityHeader from "./CityHeader";
import ForecastContainer from "../../containers/ForecastContainer";
import ForecastRow from "./ForecastRow";
import "../style/ForecastHistory.scss";

function CityForecastHistory({ city, weather, imgUrl }) {
  const detail = true;
  const todayWeather = weather ? weather[0] : null;
  return (
    <div className="ForecastHistory">
      {todayWeather ? (
        <React.Fragment>
          <div>
            <CityHeader
              detail={detail}
              todayWeather={todayWeather}
              city={city}
            />
          </div>
          <div className="ForecastHistory__data-grid">
            <table className="ForecastHistory__table">
              <thead className="ForecastHistory__thead">
                <tr>
                  <th>Создан</th>
                  <th>Погода</th>
                  <th>Средняя темп.</th>
                  <th>Мин. темп.</th>
                  <th>Макс. темп.</th>
                  <th>Ветер</th>
                  {detail ? (
                    <React.Fragment>
                      <th>Влажность</th>
                      <th>Давление</th>
                      <th>Видимость</th>
                      <th>Точность прогноза</th>
                    </React.Fragment>
                  ) : null}
                </tr>
              </thead>
              <tbody className="ForecastHistory__tbody">
                {weather.map(weather => (
                  <tr key={weather.id} className="ForecastHistory__item">
                    {ForecastContainer(ForecastRow, {
                      weather,
                      imgUrl,
                      detail
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ) : (
        <div>404 Нет результатов по запросу</div>
      )}
    </div>
  );
}

export default CityForecastHistory;
