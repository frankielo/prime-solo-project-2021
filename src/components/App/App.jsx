import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// import Nav from '../Nav/Nav';


import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../Header/Header'
import PostForm from '../PostForm/PostForm'
import ManagePosts from '../ManagePosts/ManagePosts'
import Categories from '../Categories/Categories'
import AdminPosts from '../AdminPosts/AdminPosts'
import Blogs from '../Blogs/Blogs'
import { ThemeProvider } from '@mui/material/styles';
import theme from "../ui/Theme";

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type : 'FETCH_CATEGORIES'})
  }, [dispatch]);

  return (

    <ThemeProvider theme={theme}>
    <Router>
      <div style={{minHeight:"100%",marginBottom:"2rem"}}>
        <Header/>
        {/* <Nav /> */}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/blogs" />

          {/* Visiting localhost:3000/about will show the about page. */}


          
          <Route
            exact
            path="/blogs"
          >
            <Blogs />
          </Route>


          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <ProtectedRoute
          exact
          path="/postform"
          >
            <PostForm/>
          </ProtectedRoute>
          <ProtectedRoute
          exact
          path="/manageposts"
          >
            <ManagePosts/>
          </ProtectedRoute>





          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute> */}

          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </Route>
          


          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/blogs" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/blogs" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/blogs" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <Route
            exact
            path="/categories"
          >
            {user.user_role !== "admin" ?
              <h1>404 : PAGE NOT FOUND</h1>
              :
              <Categories />
            }
          </Route>


          <Route
            exact
            path="/adminpost"
          >
            {user.user_role !== "admin" ?
              <h1>404 : PAGE NOT FOUND</h1>
              :
              <AdminPosts />
            }
          </Route>


          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404 : PAGE NOT FOUND</h1>
          </Route>
        </Switch>
        
      </div>
      <Footer />
    </Router>
    </ThemeProvider>
  );
}

export default App;
