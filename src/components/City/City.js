import "../style/City.scss";
import React from "react";
import ForecastContainer from "../../containers/ForecastContainer";
import CityHeader from "./CityHeader";
import Forecast from "./Forecast";

function City({ city, weekWeather, imgUrl }) {
  const todayWeather = weekWeather[0];

  return (
    <section className="City">
      <CityHeader todayWeather={todayWeather} city={city} />
      <section className="City__weather">
        {weekWeather.map(weather => (
          <React.Fragment key={weather.id}>
            {ForecastContainer(Forecast, {
              weather,
              imgUrl,
              woeid: city.woeid
            })}
          </React.Fragment>
        ))}
      </section>
    </section>
  );
}

export default City;
