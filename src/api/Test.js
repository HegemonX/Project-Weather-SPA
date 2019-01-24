import React, { Component } from "react";
import * as fromGet from "./weatherGET";

export default class Test extends Component {
  componentDidMount() {
    fromGet
      .getSitiesListByCoords("36.96,-122.02")
      .then(res => console.table(res));
  }
  render() {
    return <div />;
  }
}
