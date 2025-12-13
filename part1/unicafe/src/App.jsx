import { useState } from 'react'

const Button = ({ state, setState, text }) => <button onClick={() => setState(state+1)}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => (
  <>
    <h1>statistics</h1>

    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={ good + neutral + bad } />
        <StatisticLine text={"average"} value={ ( (1)*good + (0)*neutral + (-1)*bad ) / (good + neutral + bad) } />
        <StatisticLine text={"positive"} value={`${100*good / (good + neutral + bad)} %`} />
      </tbody>
    </table>
  </>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button state={good} setState={setGood} text={"good"} />
        <Button state={neutral} setState={setNeutral} text={"neutral"} />
        <Button state={bad} setState={setBad} text={"bad"} />
      </div>

      {
        (good + neutral + bad) != 0 ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>no feedbacks given</p>
      }

    </div>
  )
}

export default App