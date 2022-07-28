import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";

function ExerciseList() {

    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseCategory, setExerciseCategory] = useState("");
    const [exerciseDescription, setExerciseDescription] = useState("");

    useEffect(() => {
        handleGetExercises()
    }, [])

    const handleGetExercises = () => {
        return fetch("http://localhost:3000/exercises")
        .then((r) => r.json())
        .then((exercises) => {
          setExercises(exercises)
        })
      }

      function handleExerciseSubmit(e) {
        e.preventDefault();
        const exerciseData = {
          name: exerciseName,
          category: exerciseCategory,
          description: exerciseDescription,
        };
        fetch("http://localhost:3000/exercises", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify(exerciseData),
        })
          .then((r) => r.json())
          .then((newExercise) => {
            const allExercisesWithNew = [...exercises, newExercise]
            setExercises(allExercisesWithNew);
            setExerciseName("");
            setExerciseCategory("");
            setExerciseDescription("");
          })
      }

      function handleDeleteExercise(deletedExercise) {
        const updatedExercises = exercises.filter((exercise) => exercise.id !== deletedExercise.id)
        setExercises(updatedExercises)
      }

      const allExercises = exercises.map((exercise) => {
        return <Exercise key={exercise.id} exercise={exercise} handleExerciseDelete={handleDeleteExercise}/>
      });

      return (
        <main>
          <div className="exerciseTitle">Current Exercises</div>
            <ul className="exerciseList">
              {allExercises}
            </ul>
          <div className="exerciseSubmission">
            <div className="exerciseFormTitle">Add A New Exercise:</div>
              <form className="exerciseForm" onSubmit={handleExerciseSubmit}>
                <div className="nameInput">
                  <label htmlFor="name-input">Exercise:</label>
                  <input id="name-input" type="text" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
                </div>
                <div className="descriptionInput">
                 <label htmlFor="description-input">Description:</label>
                 <input id="description-input" type="text" value={exerciseDescription} onChange={(e) => setExerciseDescription(e.target.value)} />
                </div>
                <select name="category" id="category" onChange={(e) => setExerciseCategory(e.target.value)} value={exerciseCategory}>
                 <option value="Category" disabled>Category</option>
                 <option value="Glutes">Glutes</option>
                 <option value="Biceps">Biceps</option>
                 <option value="Legs">Legs</option>
                </select>
                <input type="submit" className="submitButton"/>
              </form>
          </div>
        </main>
      );
}

export default ExerciseList;
