import React from "react";
import ReactDOM from "react-dom";
import Root from "../Root";
import { shallow } from "enzyme";
import configureStore from "../../configureStore";
import renderer from "react-test-renderer";

describe("App", () => {
  const div = document.createElement("div");
  it("renders w/o crashing", () => {
    ReactDOM.render(<Root store={configureStore()} />, div);
  });

  it("renders without crashing", () => {
    shallow(<Root store={configureStore()} />);
  });
});

// it("renders", () => {
//   const App = renderer.create(<Root store={configureStore()} />).toJSON();
//   expect(App).toMatchSnapshot();
// });
