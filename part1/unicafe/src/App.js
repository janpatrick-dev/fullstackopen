import { useState } from 'react';

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad;
  const average = (good - bad) / sum;
  const positive = good / sum * 100;

  if (sum <= 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const sum = good + neutral + bad;
  const average = (good - bad) / sum;
  const positive = good / sum * 100;

  const handleGood = (newValue) => () => {
    setGood(newValue);
  }

  const handleNeutral = (newValue) => () => {
    setNeutral(newValue);
  }

  const handleBad = (newValue) => () => {
    setBad(newValue);
  }

  return (
    <div className="App">
      <h1>give feedback</h1>
      <button onClick={handleGood(good + 1)}>good</button>
      <button onClick={handleNeutral(neutral + 1)}>neutral</button>
      <button onClick={handleBad(bad + 1)}>bad</button>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
