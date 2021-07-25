import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "upkit/dist/style.min.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import UserAccount from "./pages/UserAccount";
import OrderHistory from "./pages/OrderHistory";
import Logout from "./pages/Logout";
import GuardRoute from "./components/GuardRoute";

import { Provider } from "react-redux";
import store from "./app/store";

import { listen } from "./app/listener";
import { getCart } from "./api/cart";

function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/register/berhasil">
            <RegisterSuccess />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <GuardRoute path="/checkout">
            <Checkout />
          </GuardRoute>
          <GuardRoute path="/account">
            <UserAccount />
          </GuardRoute>
          <GuardRoute path="/history">
            <OrderHistory />
          </GuardRoute>
          <GuardRoute path="/logout">
            <Logout />
          </GuardRoute>
          <Route path="/registerCashier" component={Register} />
          <GuardRoute path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
