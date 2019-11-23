import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">

        {/* <li><Link to="/login">Login</Link></li> */}



        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/protected" component={BubblePage} />

      </div>
    </Router>
  );
}

export default App;
