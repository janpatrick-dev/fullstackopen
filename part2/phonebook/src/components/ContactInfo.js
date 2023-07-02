const ContactInfo = ({person, handleDelete}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={(e) => handleDelete(e, person.id)}>delete</button>
    </div>
  )
}

export default ContactInfo;