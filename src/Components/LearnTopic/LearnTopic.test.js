import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LearnTopic from "./LearnTopic";
import { Card } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<LearnTopic />", () => {
  let wrapper;

  // beforeEach runs before every test and we create shallow
  // component like this so that we don't need to do it in every
  // individual test.
  beforeEach(() => {
    wrapper = shallow(<LearnTopic icon="learnGithub" />);
  });

  it("Should render one Card component: ", () => {
    // We can set props in each test
    wrapper.setProps({ icon: "learnReact" });
    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
