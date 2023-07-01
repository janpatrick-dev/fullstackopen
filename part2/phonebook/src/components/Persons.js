import ContactInfo from "./ContactInfo";

const Persons = ({persons}) => {

  return (
    <div>
      {persons.map((person) => 
        <ContactInfo key={person.id} person={person} />
      )}
    </div>
  )
}

export default Persons;