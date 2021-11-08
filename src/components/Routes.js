import { Switch, Route, Redirect } from "react-router";
import { Results } from "./Results";

export const Routes = () => {
  return (
    <div className="p-4">
      <Switch>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
        {/* Render <Results /> if path is in path array */}
        <Route exact path={["/search", "/images", "/videos", "/news"]}>
          <Results />
        </Route>
      </Switch>
    </div>
  );
};
