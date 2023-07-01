const Filter = ({text, value, handleChange}) => {
  
  return (
    <div>
      {text} <input type='text' value={value} onChange={handleChange} />
    </div>
  )
}

export default Filter;