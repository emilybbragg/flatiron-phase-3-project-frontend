import React from "react";

function Workout( {workout, handleDeleteWorkout} ) {

    return (
        <div className="workoutItemContainer">
        <li className="workoutItems">
            <strong>{workout.name}</strong>
            <br></br>
            <span>Description: {workout.description}</span>
            <br></br>
            <button className="deleteButton gg-trash"
              onClick={() => handleDeleteWorkout(workout)}>
            </button>
        </li>
        </div>
      );
  }

export default Workout;