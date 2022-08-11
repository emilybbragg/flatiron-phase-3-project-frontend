import React from "react";

function Exercise( {exercise, handleExerciseDeleteClick} ) {

    return (
        <div className="exerciseItemContainer">
        <li className="exerciseItems">
            <strong>{exercise.name}</strong>
            <br></br>
            <span>Category: {exercise.category}</span>
            <br></br>
            <span>Description: {exercise.description}</span>
            <br></br>
            <button className="deleteButton gg-trash"
              onClick={() => handleExerciseDeleteClick(exercise)}>
            </button>
        </li>
        </div>
      );
  }


export default Exercise;