import React, { Component } from "react";
import PropTypes from "prop-types";
import Content from "../components/City/City";
import { connect } from "react-redux";
import { getNearestSityInfo, getWeekWeather } from "../reducers";
import { fetchNearestCityInfo } from "../actions";
import { WEATHER_STATIC_URL, PROXY_URL } from "../api";

class ContentContainer extends Component {
  componentDidMount() {
    const { fetchNearestCityInfo } = this.props;
    fetchNearestCityInfo();
  }
  render() {
    const { cityInfo, weekWeather } = this.props;
    const imgUrl = PROXY_URL + WEATHER_STATIC_URL;
    const JSX =
      cityInfo === undefined ? (
        <div>Loading...</div>
      ) : (
        <Content city={cityInfo} weekWeather={weekWeather} imgUrl={imgUrl} />
      );
    return JSX;
  }
}

const mapStateToProps = state => ({
  cityInfo: getNearestSityInfo(state),
  weekWeather: getWeekWeather(state)
});

const mapDispatchToProps = {
  fetchNearestCityInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentContainer);
