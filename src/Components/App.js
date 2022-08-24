import React from "react";
import { Route, Routes } from "react-router-dom";
import ExerciseList from "./ExerciseList";
import WorkoutList from "./WorkoutList";
import Home from "./Home";

function App() {
  
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/exerciselist" element={<ExerciseList />}/>
        <Route exact path="/workoutlist" element={<WorkoutList />}/>
      </Routes>
    </div>
  );
}

export default App;