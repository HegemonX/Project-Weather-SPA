import React, { Component } from "react";
import SearchField from "../components/SearchField";
import FoundedCitiesList from "../components/FoundedCitiesList";
import { connect } from "react-redux";
import { fetchCitiesBySearch, setSearchQuery } from "../actions";
import {
  getCitiesFromSearch,
  getSearchQuery,
  getIsCitiesFetching
} from "../reducers";
import throttle from "lodash/throttle";

class SearchFieldContainer extends Component {
  showSitiesList = e => {
    const elem = this.listElement;
    elem.classList.remove("founded-list_hidden");
    document.addEventListener("click", this.sitiesListClickChecker);
  };
  sitiesListClickChecker = e => {
    if (e.target.closest(".SearchField__input")) return;
    this.hideSitiesList();
  };
  hideSitiesList = e => {
    document.removeEventListener("click", this.sitiesListClickChecker);
    this.listElement.classList.add("founded-list_hidden");
  };
  onSearchFieldChange = e => {
    const newQuery = e.target.value;
    this.processQueryChange(newQuery);
  };
  processQueryChange = query => {
    this.throttledSetQuery(query);
    this.throttledFetch(query);
  };
  throttledFetch = throttle(
    query => this.props.fetchCitiesBySearch(query),
    1000
  );
  throttledSetQuery = throttle(query => this.props.setSearchQuery(query), 1000);
  render() {
    const { cities, query, isFetching } = this.props;
    return (
      <SearchField
        onChange={this.onSearchFieldChange}
        onFocus={this.showSitiesList}
      >
        <FoundedCitiesList
          cities={cities}
          isFetching={isFetching}
          query={query}
          listRef={el => (this.listElement = el)}
        />
      </SearchField>
    );
  }
}

const mapStateToProps = state => ({
  cities: getCitiesFromSearch(state),
  query: getSearchQuery(state),
  isFetching: getIsCitiesFetching(state)
});

const mapDispatchToProps = {
  fetchCitiesBySearch,
  setSearchQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFieldContainer);
