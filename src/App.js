import { Route, Switch, Redirect } from "react-router";
import AllQuotes from "./pages/AllQuotes";
import DetailQuotes from "./pages/DetailQuotes";
import NewQuotes from "./pages/NewQuotes";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quotesId">
          <DetailQuotes />
        </Route>
        <Route path="/new-quotes">
          <NewQuotes />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
