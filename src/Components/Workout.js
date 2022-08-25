import React, {useState, useEffect} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Workout( {workout, handleDeleteWorkout, handleWorkoutDeleteClick, exerciseArray, allExerciseWorkouts} ) {

  const [selectedExercises, setSelectedExercises] = useState([])
  const [workoutExercises, setWorkoutExercises] = useState([])

    useEffect(() => {
    }, [selectedExercises])

    useEffect(() => {
      const filteredExerciseWorkouts = allExerciseWorkouts.filter(ew => ew.workout_id == workout.id)
      const exercisesToReturn = []
      for (const workoutExercise of filteredExerciseWorkouts) {
        const foundExercise = exerciseArray.find(exercise => workoutExercise.exercise_id == exercise.id)
        exercisesToReturn.push(foundExercise)
      }

      setWorkoutExercises(exercisesToReturn)
    }, [allExerciseWorkouts])

  function handleAddExercises(e) {    
      e.preventDefault();
      const workoutData = {
        exercises: selectedExercises
      };
      fetch(`http://localhost:9292/workouts/${workout.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(workoutData),
      })
      .then((r) => r.json())
      .then((exercisesData) => {
          setWorkoutExercises(exercisesData)
      })
  }

  function handleSelectExercise(e) {
      const exercises = [...selectedExercises]

      if (exercises.includes(e.target.value)) {
          const exerciseIndex = exercises.indexOf(e.target.value)
          exercises.splice(exerciseIndex, 1)
      } else {
          exercises.push(e.target.value)
      }
      setSelectedExercises(exercises)
  }

  const allExercises = exerciseArray.map((exercise) => {
    return (
        <li className="checkboxList">
            <input type="checkbox" value={exercise.id} defaultChecked={workoutExercises.find(workoutExercise => exercise.id == workoutExercise.id)} name={exercise.name} onChange={(e) => handleSelectExercise(e)} handleDeleteWorkout={handleDeleteWorkout}/>
            <label htmlFor={exercise.name}>{exercise.name}</label>
        </li>
    )
  })

  const allWorkoutExercises = workoutExercises.map(exercise => {
        return (
            <li className="exerciseWorkoutList" key={exercise.id}>{exercise.name}</li>
        )
  })

  return (
    <div className="workoutItemContainer">
        <li className="indivWorkouts">
          <strong>{workout.name}</strong>
          <br></br>
          <span>Description: {workout.description}</span>
          <br></br>
          <div>
            <label>Exercises:</label>
            <ul className="workoutExercises">{allWorkoutExercises}</ul>
          </div>
          <br></br>
          <Popup trigger={<button className="editButton">Edit</button>}>
            <div className="popupTitle">Select Exercises to Add or Remove:</div>
            <form className="workoutForm" onSubmit={handleAddExercises}>
              <ul className="exerciseList">{allExercises}</ul>
              <input type="submit" className="checkboxSubmit" />
            </form>
          </Popup>
          <div class="divider"/>
          <button className="workoutDeleteButton" onClick={() => handleWorkoutDeleteClick(workout)}>Delete</button>
        </li>
    </div>
  )
}

export default Workout;