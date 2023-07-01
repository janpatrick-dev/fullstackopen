const Course = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(({id, name, parts}) => (
        <div key={id}> 
          <h2>{name}</h2>
          {parts.map((part) => (
            <p key={part.id}>{part.name} {part.exercises}</p>
          ))}
          <p>
            <strong>
              total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
            </strong>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Course;