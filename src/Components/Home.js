import React from "react";

function Home() {
    return (
        <>
        <div className="greetingContainer">
            <div className="greeting">{"Welcome to Don't Sweat It! Your personalized fitness tracker."}</div>
            <div className="greetingLink"><a href="http://localhost:3000/workoutlist">Let's go!</a></div>
        </div>
        </>
    );
}

export default Home;