const Course = ({course}) => {
  const {name, parts} = course;
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h1>{name}</h1>
      {parts.map((part) => (
        <p key={part.id}>{part.name} {part.exercises}</p>
      ))}
      <p>
        <strong>total of {sum} exercises</strong>
      </p>
    </div>
  )
}

export default Course;