import React, {useState, useEffect} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Workout( {workout, handleDeleteWorkout, handleWorkoutDeleteClick, exerciseArray, allExerciseWorkouts} ) {

  const [selectedExercises, setSelectedExercises] = useState([])
  const [workoutExercises, setWorkoutExercises] = useState([])

    useEffect(() => {
      // console.log(exerciseArray)
      // console.log(allExerciseWorkouts)
      // const exercisesForWorkout = allExerciseWorkouts.filter(ew => workout.id == ew.workout_id)

      // const exercisesForSelect = []

      // for (const element of exercisesForWorkout) {
      //   const foundExercise = exerciseArray.find(exercise => exercise.id == element.exercise_id)
      //   // console.log("FOUND EXERCISE")
      //   // console.log(foundExercise)
      //   if (foundExercise) {
      //     exercisesForSelect.push(foundExercise)
      //   }
      // }

      // console.log(exercisesForWorkout)
      // console.log(exercisesForSelect)
    }, [exerciseArray, allExerciseWorkouts])

    useEffect(() => {
      console.log("SELECTED EXERCISES")
      console.log(selectedExercises)
    }, [selectedExercises])

    useEffect(() => {
      console.log("WORKOUT EXERCISES")
      console.log(workoutExercises)

      if (workoutExercises && workoutExercises.length > 0) {
        const exercisesForSelect = workoutExercises.map(exercise => exercise.id.toString())
        setSelectedExercises(exercisesForSelect)
      }
    }, [workoutExercises])

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
      console.log("SELECTED EXERCISES")
      console.log(workoutData)

      fetch(`http://localhost:9292/workouts/${workout.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(workoutData),
      })
      .then((r) => r.json())
      .then((exercisesData) => {
          console.log("EXERCISES DATA (RESP)")
          console.log(exercisesData)
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