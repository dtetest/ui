import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import ServiceLogin from "./components/frontend/auth/ServiceLogin";
import Home from "./components/frontend/Home";

import MasterLayout from "./layout/admin/MasterLayout";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/servicelogin" component={ServiceLogin} /> */}

          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
          </Route>

          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
          </Route>

          {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} /> */}

          <AdminPrivateRoute path="/admin" name="Admin" />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
