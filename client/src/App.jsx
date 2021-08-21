import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={UpdatePage} exact path="/restaurants/:id/update" />
          <Route
            component={RestaurantDetailPage}
            exact
            path="/restaurants/:id"
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
