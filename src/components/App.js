import "./style/App.scss";
import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom";
import NearestCityContainer from "../containers/NearestCityContainer";
import ForecastHistoryContainer from "../containers/ForecastHistoryContainer";
import RequestedCityContainer from "../containers/RequestedCityContainer";
import CitiesMapContainer from "../containers/CitiesMapContainer";
import City from "./City/City";
import CityDetail from "./City/CityDetail";

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <Header />
      </div>
      <div className="App__main">
        <Route path="/" exact component={NearestCityContainer(City)} />
        <Route path="/(map)" component={CitiesMapContainer} />
        <Route
          path="/:woeid([0-9]+)/:year([0-9]{4})/:month([0-9]{1,2})/:day([0-9]{1,2})"
          component={ForecastHistoryContainer}
        />
        <Route
          path="/:woeid([0-9]+)"
          exact
          component={RequestedCityContainer(CityDetail)}
        />
      </div>
    </div>
  );
}

export default App;
