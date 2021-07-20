import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "upkit/dist/style.min.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";

import { Provider } from "react-redux";
import store from "./app/store";

import { listen } from "./app/listener";

function App() {
  React.useEffect(() => {
    listen();
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
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
