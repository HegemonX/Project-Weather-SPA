import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "./style/CitiesMap.scss";

function CitiesMap({ cities, location, url }) {
  const parseCoord = location => {
    return location.split(",").map(c => +c);
  };
  const mapState = { center: parseCoord(location), zoom: 5 };
  const handleClick = (woeid, e) => {
    window.open(`/${woeid}/`, "_self");
  };
  return (
    <YMaps>
      <div className="CitiesMap">
        {location ? (
          <Map defaultState={mapState} className="CitiesMap__map">
            <Placemark geometry={mapState.center} />
            {cities
              ? cities.map(city => (
                  <Placemark
                    onClick={e => handleClick(city.woeid, e)}
                    key={city.woeid}
                    geometry={parseCoord(city.latt_long)}
                    hint={city.title}
                    properties={{}}
                    options={{
                      preset: "islands#redIcon"
                    }}
                  />
                ))
              : null}
          </Map>
        ) : null}
      </div>
    </YMaps>
  );
}

export default CitiesMap;
