import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";

import App from "../components/App";

describe("<App />", () => {
  it("Renders the app properly", async () => {
    const wrapper = mount(<App />);
    await wait();
    wrapper.update()
    // console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
