import React from "react";

function Exercise( {exercise, handleExerciseDeleteClick} ) {

  return (
      <div className="exerciseItemContainer">
          <li className="indivExercises">
              <strong>{exercise?.name}</strong>
              <br></br>
              <span>Category: {exercise?.category?.name}</span>
              <br></br>
              <span>Description: {exercise?.description}</span>
              <br></br>
              <button className="deleteButton" onClick={() => handleExerciseDeleteClick(exercise)}>Delete</button>
          </li>
      </div>
    );
}

export default Exercise;