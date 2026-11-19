import React, { Suspense } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ScrollToTop from "./utils/ScrollToTop";
import Journey from "./pages/Journey/Journey";

import "./App.css";

const Main = React.lazy(() => import("./pages/Main/Main"));
const MainV2 = React.lazy(() => import("./pages/MainV2/MainV2"));
const BlogPage = React.lazy(() => import("./pages/Blog/BlogPage"));
const ProjectPage = React.lazy(() => import("./pages/Project/ProjectPage"));

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              Loading...
            </div>
          }
        >
          <Switch>
            <Route path="/" exact component={Journey} />
            <Route path="/v2" exact component={MainV2} />
            <Route path="/v1" exact component={Main} />
            <Route path="/blog" exact component={BlogPage} />
            <Route path="/projects" exact component={ProjectPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
