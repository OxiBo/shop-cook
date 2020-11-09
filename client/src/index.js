// TODO - add helmet for dynamic pages names 
// TODO change time format in the reset password later and adjust it to the user time zone
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import "react-toastify/dist/ReactToastify.css";
import ToastContainerStyles from "./components/styles/ToastContainerStyles";
import App from "./components/App";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import RequestReset from "./components/RequestReset";
import ResetPassword from './components/ResetPassword'
import MyShoppingLists from "./components/MyShoppingLists";
import FavoriteRecipes from "./components/FavoriteRecipes";
// import TestCount from './components/TestCount'
import * as serviceWorker from "./serviceWorker";
// import axios from 'axios'
import reducers from "./reducers";
import DelayedCount from "./components/DelayedCount";

// for redux debug tool in the browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

// const res = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularAPI_KEY}&query=pasta`).then(response =>  console.log(response))
// console.log(res)

// const res1 = axios.get(`https://api.spoonacular.com/recipes/511728/information?apiKey=${spoonacularAPI_KEY}`).then(response =>  console.log(response))
// console.log(res1)

// https://api.spoonacular.com/recipes/511728/information
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainerStyles
          position="top-center"
          autoClose={15000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <App>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/request-reset" component={RequestReset} />
            <Route exact path="/reset" component={ResetPassword}/>
            <Route exact path="/lists" component={MyShoppingLists} />
            <Route exact path="/recipes" component={FavoriteRecipes} />
            <Route exact path="/test-count" component={DelayedCount} />
          </App>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
