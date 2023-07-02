import ContactInfo from "./ContactInfo";

const Persons = ({persons, handleDelete}) => {

  return (
    <div>
      {persons.map((person) => 
        <ContactInfo 
          key={person.id} 
          person={person}
          handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default Persons;