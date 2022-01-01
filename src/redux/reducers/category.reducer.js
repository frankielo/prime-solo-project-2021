import { combineReducers } from 'redux';


const setCategories = (state = [], action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return action.payload;
      default:
        return state;
    }
  };



export default combineReducers({
    setCategories
});
  