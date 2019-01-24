import React from "react";
import "../style/City.scss";
import ForecastContainer from "../../containers/ForecastContainer";
import Forecast from "./Forecast";
import CityHeader from "./CityHeader";

function CityDetail({ city, weekWeather, imgUrl }) {
  const todayWeather = weekWeather[0];

  return (
    <section className="City">
      <CityHeader detail={true} todayWeather={todayWeather} city={city} />
      <section className="City__weather">
        {weekWeather.map(weather => (
          <React.Fragment key={weather.id}>
            {ForecastContainer(Forecast, {
              weather,
              imgUrl,
              detail: true,
              woeid: city.woeid
            })}
          </React.Fragment>
        ))}
      </section>
    </section>
  );
}

export default CityDetail;
