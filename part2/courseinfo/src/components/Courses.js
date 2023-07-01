const Course = (props) => {
  const { name, parts } = props.course;
  return (
    <div> 
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
  )
}

const Courses = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default Courses;