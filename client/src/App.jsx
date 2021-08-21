import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RestaurantsContextProvider from "./context/RestaurantsContext";
const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route component={Home} exact path="/" />
            <Route
              component={UpdatePage}
              exact
              path="/restaurants/:id/update"
            />
            <Route
              component={RestaurantDetailPage}
              exact
              path="/restaurants/:id"
            />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
