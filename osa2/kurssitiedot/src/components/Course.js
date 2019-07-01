import React from 'react'

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return <Part part={part.name} exercises={part.exercises} key={part.id} />
      })}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce( (total, part) => {
    return total + part.exercises
  }, 0)
  return (
    <div>
      <p><strong>Total of {total} exercises</strong></p>
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course