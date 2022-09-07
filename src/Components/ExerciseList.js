import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";
import NavBar from "./NavBar";

function ExerciseList() {

  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCategory, setExerciseCategory] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [exercisesToDisplay, setExercisesToDisplay] = useState([]);

  useEffect(() => {
      handleGetCategories()
  }, [])

  useEffect(() => {
      if (allCategories?.length > 0) {
          handleGetExercises()
      }
  }, [allCategories])

  useEffect(() => {
      setExercisesToDisplay(exercises)
      }, [exercises])

  useEffect(() => {
    if (filterCategory) {
        const filteredExercises = exercises.filter(exercise => exercise.category_id === filterCategory.id) 
        setExercisesToDisplay(filteredExercises)  
    }
    else if (exercises && exercises?.length > 0) {
        setExercisesToDisplay(exercises)
    }
  }, [filterCategory])    

  //creating categoryOnChange function; category selection for exercise submission form
  const categoryOnChange = (event) => {
    const foundCategory = allCategories.find(category => category.id == event.target.value)
    setExerciseCategory(foundCategory)   
}

  const handleCategoryFilterChange = (event) => {
      const foundCategory = allCategories.find(category => category.id == event.target.value)
      setFilterCategory(foundCategory)
  }

  const allExercises = exercisesToDisplay.map((exercise) => {
    return <Exercise key={exercise.id} exercise={exercise} handleExerciseDeleteClick={handleExerciseDeleteClick}/>
  });

  const allCatsForExercise = allCategories.map(category => <option value={category.id}>{category.name}</option>)

  const handleGetCategories = () => {
      return fetch("http://localhost:9292/categories")
      .then((r) => r.json())
      .then((data) => {
        setAllCategories(data)
      })
  }

  const handleGetExercises = () => {
    return fetch("http://localhost:9292/exercises")
    .then((r) => r.json())
    .then((exercises) => {
        const exercisesWithCategoryData = []

        for (const exercise of exercises) {
            const foundExerciseCategory = allCategories.find(category => category.id === exercise.category_id)
            const exerciseWithCategory = {...exercise, category: foundExerciseCategory}
            exercisesWithCategoryData.push(exerciseWithCategory)
        }
        setExercises(exercisesWithCategoryData)
    })
  }

  function handleExerciseDeleteClick(exercise) {
      fetch(`http://localhost:9292/exercises/${exercise.id}`, {
          method: "DELETE",
      })
      .then((r) => r.json())
      .then(() => handleDeleteExercise(exercise))
  }

  function handleDeleteExercise(deletedExercise) {
      const updatedExercises = exercises.filter((exercise) => exercise.id !== deletedExercise.id)
      setExercises(updatedExercises)
  }
    
  function handleExerciseSubmit(e) {
      e.preventDefault();
      const exerciseData = {
        name: exerciseName,
        category_id: exerciseCategory.id,
        description: exerciseDescription,
      };
      
      fetch("http://localhost:9292/exercises", {
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

    return (
      <main>
          <NavBar />
          <div className="exerciseWrap">
            <div className="exerciseTitle">Available Exercises</div>
            <select name="categorySearch" id="categorySearch" defaultValue={filterCategory?.id} onChange={(e) => handleCategoryFilterChange(e)}>
              <option value="" selected disabled hidden>Search By Category</option>
              {allCatsForExercise}
            </select>
            <ul className="exerciseList">{allExercises}</ul>
          </div>
          <div className="exerciseSubmission">
            <div className="exerciseFormTitle">Add A New Exercise</div>
            <form className="exerciseForm" onSubmit={handleExerciseSubmit}>
              <div className="nameInput">
                <label htmlFor="name-input">Name:</label>
                <textarea id="name-input" type="text" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
              </div>
              <div className="descriptionInput">
                <label htmlFor="description-input">Description:</label>
                <textarea id="description-input" type="text" value={exerciseDescription} onChange={(e) => setExerciseDescription(e.target.value)} />
              </div>
              <select name="categorySelect" id="categorySelect" defaultValue={exerciseCategory?.id} onChange={(e) => categoryOnChange(e)}>
                <option value="" selected disabled hidden>Category</option>
                  {allCatsForExercise}
              </select>
              <input type="submit" className="submitButton"/>
            </form>
          </div>
      </main>
    );
}

export default ExerciseList;