// https://medium.com/asos-techblog/how-to-test-your-react-redux-application-48d90481a253

import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DisplayRecipeList from "../components/DisplayRecipeList";
import { fetchRecipes } from "../actions";
const mockStore = configureStore([]);

describe("<DisplayRecipeList />", () => {
//   let store, wrapper, componentInstance, searchRecipesForm, shallowWrapper;
let wrapper, store, componentInstance;  
beforeEach(async () => {
    store = mockStore({
      recipes: [],
    });
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <DisplayRecipeList />
      </Provider>
    );

    await wait();
    wrapper.update();
    shallowWrapper = shallow(<DisplayRecipeList store={store} />);
    console.log(shallowWrapper.debug());
    componentInstance = shallowWrapper.instance();
    console.log(componentInstance);
  });
  it("Renders the component properly and matches the snapshot", async () => {
    // const searchForm = wrapper.find('[data-test="recipes-search-form"]');
    // console.log(searchForm.debug());
    expect(toJSON(shallowWrapper)).toMatchSnapshot();
  });

 
});
