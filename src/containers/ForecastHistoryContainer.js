import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWeatherByDate } from "../actions";
import { getDailyWeather, getCityInfo } from "../reducers";
import CityForecastHistory from "../components/City/CityForecastHistory";
import { WEATHER_STATIC_URL, PROXY_URL } from "../api";
import FetchPlaceholder from "../components/FetchPlaceholder";

const createDateKey = (year, month, day) => {
  if (+month < 10) month = "0" + +month;
  if (+day < 10) day = "0" + +day;
  return `${year} ${month} ${day}`;
};

export class ForecastHistoryContainer extends Component {
  componentDidMount() {
    this.makeFetchRequest();
  }
  componentDidUpdate(prevProps) {
    const { url } = this.props.match;
    if (prevProps.match.url === url) return;
    this.makeFetchRequest();
  }
  makeFetchRequest = () => {
    const { woeid, year, month, day } = this.props.match.params;
    const { fetchWeatherByDate } = this.props;
    const dateKey = createDateKey(year, month, day);
    fetchWeatherByDate(woeid, dateKey);
  };
  render() {
    const imgUrl = PROXY_URL + WEATHER_STATIC_URL;
    const { dailyWeather, requestedCity } = this.props;
    return dailyWeather && requestedCity ? (
      <CityForecastHistory
        city={requestedCity}
        weather={dailyWeather}
        imgUrl={imgUrl}
      />
    ) : (
      <FetchPlaceholder />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: { params }
  } = ownProps;
  const { woeid, year, month, day } = params;
  const dateKey = createDateKey(year, month, day);
  return {
    dailyWeather: getDailyWeather(state, woeid, dateKey),
    requestedCity: getCityInfo(state, woeid)
  };
};

const mapDispatchToProps = {
  fetchWeatherByDate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastHistoryContainer);
