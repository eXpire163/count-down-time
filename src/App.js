import './App.css';
import React, { useEffect, useState } from "react";


const calculateTimeLeft = (endHour, endMinute) => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDate();
  let difference = +new Date(year, month, day, endHour, endMinute) - +new Date();
  //console.log(endHour, endMinute)
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
}


function App() {


  const searchParams = new URLSearchParams(document.location.search)

  const endHour = searchParams.get('endHour');
  const endMinute = searchParams.get('endMinute');
  const topic = searchParams.get('topic');;

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endHour, endMinute));

  const timerComponents = [];


  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endHour, endMinute));
    }, 1000);

    return () => clearTimeout(timer);
  });


  return (
    <div className="App">
      <header className="App-header">
        {!endHour && !endMinute ? <><h1>start via url</h1>
          <a className="App-link" href='?endHour=15&endMinute=50'>without topic</a>
          <a className="App-link" href='?endHour=15&endMinute=50&topic=mytimer'>withtopic</a></> : <></>}
        {topic?.length ? <h1>{topic}</h1> : <></>}
        {timerComponents.length ? <h1>Start in {timerComponents}</h1> : <h1>let's go</h1>}
      </header>
    </div >
  );

}

export default App;
