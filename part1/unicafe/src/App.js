import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [sum, setSum] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = (newValue) => () => {
    const newSum = sum + 1;
    setGood(newValue);
    setSum(newSum);
    setAverage((newValue - bad) / newSum);
    setPositive(newValue / newSum * 100);
  }

  const handleNeutral = (newValue) => () => {
    const newSum = sum + 1;
    setNeutral(newValue);
    setSum(newSum);
    setPositive(good / newSum * 100);
  }

  const handleBad = (newValue) => () => {
    const newSum = sum + 1;
    setBad(newValue);
    setSum(newSum);
    setAverage((good - newValue) / newSum);
    setPositive(good / newSum * 100);
  }

  return (
    <div className="App">
      <h1>give feedback</h1>
      <button onClick={handleGood(good + 1)}>good</button>
      <button onClick={handleNeutral(neutral + 1)}>neutral</button>
      <button onClick={handleBad(bad + 1)}>bad</button>

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  );
}

export default App;
