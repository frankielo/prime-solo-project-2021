import { combineReducers } from 'redux';


const setPosts = (state = [], action) => {
    switch (action.type) {
      case 'SET_POSTS':
        return action.payload;
      default:
        return state;
    }
  };


const editPost = (state = [], action) => {
    switch (action.type) {
      case 'EDIT_VALUES':
        return action.payload;
      case 'CLEAR_EDIT_VALUES':
        return []
      default:
        return state;
    }
  };

  const publishedPost = (state = [], action) => {
    switch (action.type) {
      case 'SET_PUBLISHED_POSTS':
        return action.payload;
      default:
        return state;
    }
  };

  const allPost = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_POSTS':
        return action.payload;
      default:
        return state;
    }
  };



  
  

export default combineReducers({
  setPosts,
  editPost,
  publishedPost,
  allPost
});
  