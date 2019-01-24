import React, { Component } from "react";
import { connect } from "react-redux";
import CitiesMap from "../components/CitiesMap";
import { getNearCities, getLatLong } from "../reducers";
import { fetchNearestCities } from "../actions";
import { withRouter } from "react-router-dom";

export class CitiesMapContainer extends Component {
  componentDidMount() {
    this.props.fetchNearestCities();
  }
  render() {
    const {
      nearCities,
      latlong,
      match: { url }
    } = this.props;
    return <CitiesMap cities={nearCities} location={latlong} url={url} />;
  }
}

const mapStateToProps = state => ({
  nearCities: getNearCities(state),
  latlong: getLatLong(state)
});

const mapDispatchToProps = {
  fetchNearestCities
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CitiesMapContainer)
);
