import { useState } from 'react'

const Header = ({ text }) => {
  return <h3>{text}</h3>
}

const StatLine = ({ text, number }) => {
  return <tr><td>{text}</td> <td>{number}</td></tr>
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Stats = ({ forGood, forBad, forNeutral }) => {
  const stuff = [
    { name: 'good', value: forGood },
    { name: 'bad', value: forBad },
    { name: 'neutral', value: forNeutral },
    { name: 'average', value: (forGood - forBad) / (forGood + forBad + forNeutral).toPrecision(2) },
    { name: 'positive', value: `${(forGood / (forGood + forBad + forNeutral) * 100).toPrecision(2)} %` }
  ]

  if (forGood || forNeutral || forBad > 0) {
    return (
      <table>
        {
          stuff.map(item => <StatLine text={item.name} number={item.value} />)
        }
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <Header text="Statistics" />
      <Stats forGood={good} forBad={bad} forNeutral={neutral} />
    </div>
  )
}

export default App