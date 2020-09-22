// https://medium.com/asos-techblog/how-to-test-your-react-redux-application-48d90481a253

import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchRecipesForm from "../components/SearchRecipesForm";
import { fetchRecipes } from "../actions";
const mockStore = configureStore([]);

describe("<SearchRecipesForm />", () => {
  let store, wrapper, componentInstance, searchRecipesForm, shallowWrapper;
  beforeEach(async () => {
    store = mockStore({
      recipes: [],
    });
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <SearchRecipesForm />
      </Provider>
    );

    await wait();
    wrapper.update();
    shallowWrapper = shallow(<SearchRecipesForm store={store} />);
    console.log(shallowWrapper.debug());
    componentInstance = shallowWrapper.dive().instance();
    console.log(componentInstance);
  });
  it("Renders the component properly and matches the snapshot", async () => {
    const searchForm = wrapper.find('[data-test="recipes-search-form"]');
    // console.log(searchForm.debug());
    expect(toJSON(searchForm)).toMatchSnapshot();
  });

  it("submits search query and receives a response from API", async () => {
    wrapper.find("input").simulate("change", { target: { value: "pasta" } });

    // console.log(componentInstance.state());
    // const componentProps = wrapper.instance().props();
    // console.log(componentInstance);
    // mock the router

    wrapper.find("form").simulate("submit",{preventDefault() {}});
    console.log(store.dispatch)
    expect(store.dispatch).toHaveBeenCalledTimes(2); // first call is to fetch recipes, second call is to store fetched recipes in redux store
    expect(store.dispatch.mock.calls).toHaveBeenCalledWith(fetchRecipes("pasta"));
    // await wait(50);
    // wrapper.update();

    //   expect(Router.router.push).toHaveBeenCalled();
    //   expect(Router.router.push).toHaveBeenCalledWith( {"pathname": "/item", "query": {"id": "abc123"}});
  });
});
