const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
}

export const filterChange = (value) => {
  return {
    type: 'SET_FILTER',
    payload: value
  }
}

export default filterReducer;