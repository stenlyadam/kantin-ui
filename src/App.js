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
import ProductManagement from "./pages/Product/ProductManagement";
import ProductAdd from "./pages/Product/ProductAdd";
import ProductEdit from "./pages/Product/ProductEdit";
import CustomerManagement from "./pages/Customer/CustomerManagement";
import CustomerAdd from "./pages/Customer/CustomerAdd";
import CustomerEdit from "./pages/Customer/CustomerEdit";
import Invoice from "./pages/Invoice";
import Logout from "./pages/Logout";
import Report from "./pages/Report";
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
          <GuardRoute path="/manajemen-produk">
            <ProductManagement />
          </GuardRoute>
          <GuardRoute path="/add-product">
            <ProductAdd />
          </GuardRoute>
          <GuardRoute path="/edit-produk/:product_id">
            <ProductEdit />
          </GuardRoute>
          <GuardRoute path="/manajemen-pelanggan">
            <CustomerManagement />
          </GuardRoute>
          <GuardRoute path="/add-customer">
            <CustomerAdd />
          </GuardRoute>
          <GuardRoute path="/edit-customer/:customer_id">
            <CustomerEdit />
          </GuardRoute>
          <GuardRoute path="/history">
            <OrderHistory />
          </GuardRoute>
          <GuardRoute path="/report">
            <Report />
          </GuardRoute>
          <Route path="/invoice/:order_id">
            <Invoice />
          </Route>
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
