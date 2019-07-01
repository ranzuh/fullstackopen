import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const handleNextClick = () => {
    setSelected(getRandomIndex())
  }
  
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const getRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const getBestAnecdoteIndex = () => {
    let max = 0
    let maxIndex = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (points[i] > max) {
        max = points[i]
        maxIndex = i
      }
    }
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleNextClick}>Next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getBestAnecdoteIndex()]}</p>
      <p>has {points[getBestAnecdoteIndex()]} votes</p>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)