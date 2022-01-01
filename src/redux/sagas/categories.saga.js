import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: will be fired on "REGISTER" actions
function* getCategories() {

  try {

    const response = yield axios.get("/api/category/")
    
    yield put({ type: 'SET_CATEGORIES', payload : response.data });

  } catch (error) {
    console.log('Error with get category saga:', error);

  }
}

function* categorySaga() {
  yield takeLatest('FETCH_CATEGORIES', getCategories);
}

export default categorySaga;
