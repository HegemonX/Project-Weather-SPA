import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import { getWoeid } from "../reducers";

export class NavbarContainer extends Component {
  render() {
    return <Navbar woeid={this.props.woeid} />;
  }
}

const mapStateToProps = state => ({
  woeid: getWoeid(state)
});

export default connect(
  mapStateToProps,
  null
)(NavbarContainer);
