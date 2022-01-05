import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getPost() {

  try {

    const response = yield  axios.get("/api/posts/user")   
    
    yield put({ type: 'SET_POSTS', payload : response.data });

  } catch (error) {
    console.log('Error with get post saga:', error);

  }
}


function* getPublishedPost() {

  try {

    const response = yield  axios.get("/api/posts")   
    
    yield put({ type: 'SET_PUBLISHED_POSTS', payload : response.data });
  } catch (error) {
    console.log('Error with get published post saga:', error);

  }
}



function* getAllPost() {

  try {

    const response = yield  axios.get("/api/posts/all")   
    yield put({ type: 'SET_ALL_POSTS', payload : response.data });

  } catch (error) {
    console.log('Error with get all post saga:', error);

  }
}

function* togglePublish(action) {

  try {

    yield  axios.put(`/api/posts/${action.payload.rowId}`,{status : action.payload.status})  
    yield put({ type: 'FETCH_ALL_POSTS'});

  } catch (error) {
    console.log('Error with get all post saga:', error);

  }
}





function* postSaga() {
  yield takeLatest('FETCH_POST', getPost);
  yield takeLatest('FETCH_PUBLISHED_POSTS', getPublishedPost);
  yield takeLatest('FETCH_ALL_POSTS', getAllPost);
  yield takeLatest('TOGGLE_BLOG_ACTIVATION', togglePublish);
}

export default postSaga;
