import React, { Component } from "react";
import { connect } from "react-redux";
import { getCityInfo, getWeekWeather } from "../reducers";
import { fetchCityInfo } from "../actions";
import { WEATHER_STATIC_URL, PROXY_URL } from "../api";
import FetchPlaceholder from "../components/FetchPlaceholder";

const RequestedCityContainer = Presentation => {
  class RequestedCityContainerClass extends Component {
    componentDidMount() {
      const { fetchCityInfo } = this.props;
      const woeid = this.props.match.params.woeid;
      fetchCityInfo(woeid);
    }
    render() {
      const { requestedCity, weekWeather } = this.props;
      const imgUrl = PROXY_URL + WEATHER_STATIC_URL;
      const JSX =
        requestedCity === undefined ? (
          <FetchPlaceholder />
        ) : (
          <Presentation
            city={requestedCity}
            weekWeather={weekWeather}
            imgUrl={imgUrl}
          />
        );
      return JSX;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const woeid = ownProps.match.params.woeid;
    return {
      requestedCity: getCityInfo(state, woeid),
      weekWeather: getWeekWeather(state, woeid)
    };
  };

  const mapDispatchToProps = {
    fetchCityInfo
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestedCityContainerClass);
};
export default RequestedCityContainer;
