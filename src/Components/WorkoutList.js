import React, { useEffect, useState } from "react";
import Workout from "./Workout";
import NavBar from "./NavBar";

function WorkoutList() {

    const [workouts, setWorkouts] = useState([]);
    const [workoutName, setWorkoutName] = useState("");
    const [workoutDescription, setWorkoutDescription] = useState("");

    useEffect(() => {
        handleGetWorkouts()
    }, [])

    const handleGetWorkouts = () => {
        return fetch("http://localhost:3000/workouts")
        .then((r) => r.json())
        .then((workouts) => {
          setWorkouts(workouts)
        })
      }

      function handleWorkoutSubmit(e) {
        e.preventDefault();
        const workoutData = {
          name: workoutName,
          description: workoutDescription,
        };
        fetch("http://localhost:3000/workouts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify(workoutData),
        })
          .then((r) => r.json())
          .then((newWorkout) => {
            const allWorkoutsWithNew = [...workouts, newWorkout]
            setWorkouts(allWorkoutsWithNew);
            setWorkoutName("");
            setWorkoutDescription("");
          })
      }


      function handleWorkoutDeleteClick(workout) {
        fetch(`http://localhost:3000/workouts/${workout.id}`, {
          method: "DELETE",
        })
          .then((r) => r.json())
          .then(() => handleDeleteWorkout(workout))
      }

      function handleDeleteWorkout(deletedWorkout) {
        const updatedWorkouts = workouts.filter((workout) => workout.id !== deletedWorkout.id)
        setWorkouts(updatedWorkouts)
      }

      const allWorkouts = workouts.map((workout) => {
        return <Workout key={workout.id} workout={workout} handleDeleteWorkout={handleDeleteWorkout}/>
      });

      return (
        <main>
            <NavBar />
            <div className="workoutWrap">
          <div className="workoutTitle">Available Workouts</div>
            <ul className="workoutList">
              {allWorkouts}
            </ul>
            </div>
          <div className="workoutSubmission">
            <div className="workoutFormTitle">Add A New Workout:</div>
              <form className="workoutForm" onSubmit={handleWorkoutSubmit}>
                <div className="nameInput">
                  <label htmlFor="name-input">Name:</label>
                  <input id="name-input" type="text" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
                </div>
                <div className="descriptionInput">
                 <label htmlFor="description-input">Description:</label>
                 <input id="description-input" type="text" value={workoutDescription} onChange={(e) => setWorkoutDescription(e.target.value)} />
                </div>
                <input type="submit" className="submitButton"/>
              </form>
          </div>
        </main>
      );
}

export default WorkoutList;