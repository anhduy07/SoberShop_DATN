import "./App.css";
import "./assets/scss/index.scss";
import "./assets/scss/grid.scss";
import Topnav from "./components/Topnav/Topnav";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "pages/Login";
import Routes from "config/Routes";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path='login'>{user ? <Redirect to="/"/> : <Login/>}</Route> */}
          <Route>
            <Topnav toggle={handleOpen} />
            <Route
              render={(props) => {
                return (
                  <div className="app-main">
                    <Sidebar {...props} isOpen={isOpen} toggle={handleOpen} />
                    <div className="app-container">
                      <Routes />
                    </div>
                  </div>
                );
              }}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
