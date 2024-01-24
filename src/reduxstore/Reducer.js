// nameReducer.js
'use client'
const Reducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NAME':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default Reducer;
  