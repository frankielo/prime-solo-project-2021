import { combineReducers } from 'redux';


const setPosts = (state = [], action) => {
    switch (action.type) {
      case 'SET_POSTS':
        return action.payload;
      default:
        return state;
    }
  };

  // const filteredList = availableToys.filter(toy=>
  //   {
  //   return (toy.name.toLowerCase().includes(nameFilter.toLowerCase()) && 
  //   (!zipFilter || toy.zip_code == zipFilter) && 
  //   (!user.id || user.id != toy.toys_userid)
  //   )}
  //  )


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


  const searchQuery = (state = "", action) => {
    switch (action.type) {
      case 'SEARCH_QUERY':
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
  allPost,
  searchQuery
});
  