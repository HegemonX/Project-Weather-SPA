import React, { Component } from "react";
import { connect } from "react-redux";
import { getNearestSityInfo, getWeekWeather } from "../reducers";
import { fetchNearestCityInfo } from "../actions";
import { WEATHER_STATIC_URL, PROXY_URL } from "../api";
import FetchPlaceholder from "../components/FetchPlaceholder";

const NearestCityContainer = Presentation => {
  class NearestCityContainerClass extends Component {
    componentDidMount() {
      const { fetchNearestCityInfo } = this.props;
      fetchNearestCityInfo();
    }
    render() {
      const { nearestSity, weekWeather } = this.props;
      const imgUrl = PROXY_URL + WEATHER_STATIC_URL;
      return nearestSity && weekWeather ? (
        <Presentation
          city={nearestSity}
          weekWeather={weekWeather}
          imgUrl={imgUrl}
        />
      ) : (
        <FetchPlaceholder />
      );
    }
  }

  const mapStateToProps = state => ({
    nearestSity: getNearestSityInfo(state),
    weekWeather: getWeekWeather(state)
  });

  const mapDispatchToProps = {
    fetchNearestCityInfo
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(NearestCityContainerClass);
};
export default NearestCityContainer;
