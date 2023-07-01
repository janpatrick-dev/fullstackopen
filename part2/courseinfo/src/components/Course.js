const Course = ({course}) => {
  const {name, parts} = course;

  return (
    <div>
      <h1>{name}</h1>
      {parts.map((part) => (
        <p key={part.id}>{part.name} {part.exercises}</p>
      ))}
    </div>
  )
}

export default Course;