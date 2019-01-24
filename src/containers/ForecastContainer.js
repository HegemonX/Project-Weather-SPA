import React from "react";
import { withRouter } from "react-router-dom";

const KM_IN_MILE = 1.60934;
const MMHG_IN_MB = 0.750062;

export const processDate = date => {
  const parsed = new Date(date);
  const now = new Date();
  if (now <= parsed) {
    if (parsed.getDate() - now.getDate() === 0) {
      return "Сегодня";
    }
    if (parsed.getDate() - now.getDate() === 1) {
      return "Завтра";
    }
  }
  const weekDay = parsed.toLocaleDateString("ru-RU", { weekday: "short" });
  const day = parsed.getDate();
  const month = parsed.toLocaleDateString("ru-RU", { month: "short" });
  return `${weekDay} ${day} ${month}`;
};
export const processTime = date => {
  const parsed = new Date(date);
  let hours = parsed.getHours();
  let minutes = parsed.getMinutes();
  minutes = Math.floor(minutes / 10) * 10;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  return `${hours}:${minutes}`;
};
export const processDateTime = date => {
  const processedDate = processDate(date);
  const time = processTime(date);
  return `${processedDate} в ${time}`;
};

export const processNum = num => {
  num = parseFloat(num);
  return Math.round(num * 10) / 10;
};

export const processTemp = temp => {
  return `${processNum(temp)}°C`;
};

export const processWind = windSpd => {
  windSpd = processNum((windSpd * KM_IN_MILE * 1000) / 3600);
  return `${windSpd} м/с`;
};

const processPercentage = value => {
  return `${processNum(value)}%`;
};
const processVisibility = visibility => {
  const km = visibility * KM_IN_MILE;
  return `${processNum(km)} км.`;
};
const processPressure = pressure => {
  const mmHg = pressure * MMHG_IN_MB;
  return `${processNum(mmHg)} мм рт.ст.`;
};

const ForecastContainer = (Presentation, props) => {
  class ContainerClass extends React.Component {
    render() {
      const { imgUrl, weather, detail, woeid, match } = this.props;
      const {
        id,
        applicable_date: date,
        created,
        weather_state_name: weatherTitle,
        weather_state_abbr: abbr,
        wind_direction: wind,
        wind_direction_compass: windStr,
        min_temp: minTemp,
        max_temp: maxTemp,
        the_temp: temp,
        wind_speed: windSpeed,
        humidity,
        visibility,
        predictability: accuracy,
        air_pressure: pressure
      } = weather;

      const imgSrc = `${imgUrl}${abbr}.svg`;
      // -45 начальная позиция иконки
      const compassRotation = wind - 45 + 180;
      const rotateCompass = {
        transform: `rotate(${compassRotation}deg)`
      };
      const windIconElement = (
        <span
          className="weather__wind-icon"
          alt={windStr}
          style={rotateCompass}
        />
      );
      return (
        <Presentation
          id={id}
          params={match.params}
          woeid={woeid}
          url={match.url}
          detail={detail}
          dateRaw={date}
          created={processDateTime(created)}
          createdDate={processDate(created)}
          createdTime={processTime(created)}
          createdRaw={created}
          date={processDate(date)}
          imgSrc={imgSrc}
          weatherTitle={weatherTitle}
          minTemp={processTemp(minTemp)}
          temp={processTemp(temp)}
          maxTemp={processTemp(maxTemp)}
          windIcon={windIconElement}
          windSpeed={processWind(windSpeed)}
          humidity={processPercentage(humidity)}
          pressure={processPressure(pressure)}
          visibility={processVisibility(visibility)}
          accuracy={processPercentage(accuracy)}
        />
      );
    }
  }
  ContainerClass = withRouter(ContainerClass);

  return <ContainerClass {...props} />;
};

export default ForecastContainer;
