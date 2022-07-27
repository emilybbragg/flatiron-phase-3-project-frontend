import React from "react";

import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import ExerciseList from "./ExerciseList";
import WorkoutList from "./WorkoutList";
import Home from "./Home";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/exerciselist">
          <ExerciseList />
        </Route>
        <Route exact path="/workoutlist">
          <WorkoutList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
