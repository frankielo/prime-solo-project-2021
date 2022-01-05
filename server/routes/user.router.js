const express = require('express');
const {
  rejectUnauthenticated,
  rejectUnauthorized
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});


// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;



router.post('/register', (req, res, next) => {

  const { username , image} = req.body

  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, user_image)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password,image])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});


router.get('/all', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  
  const queryText = `SELECT id , username, user_role, user_image from "user" ORDER BY id ASC`;
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Getting all users failed ', err);
      res.sendStatus(500);
    }); 
});


router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  const id = req.params.id
  if (id !== "2"){
  const queryText = `DELETE FROM "user" WHERE id= $1`;
  pool.query(queryText,[id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Deleting one user failed ', err);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403)
  }
});



router.put('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res, next) => {

  const id = req.params.id 
  const { username,s } = req.body

  const queryText = `UPDATE "user"
    SET username = $1
    WHERE id = $2;`;

  pool
    .query(queryText, [username, id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User updating failed: ', err);
      res.sendStatus(500);
    });
});