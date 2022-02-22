import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {TextField,Typography} from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();


  const registerUser = () => {
    dispatch({
      type: 'REGISTER',
      payload: {
        username, password
      }
      });
  }; // end registerUser

  return (
      <Grid container direction="column" spacing={2} alignContent="center" style={{marginTop:"10rem"}}>
        <Grid item>
        <Typography variant="h5">Register</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      </Grid>

      <Grid item>
          <TextField
            id="outlined-name"
            label="Username"
            value={username}
            type="text"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
      </Grid>
      <Grid item>
      <TextField
            id="outlined-name"
            label="Enter Password"
            value={password}
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </Grid>

      <Grid item>
        <Button disabled = { !username || !password }
        onClick={registerUser} variant="contained">Register</Button>
        </Grid>
      </Grid>
  );
}

export default RegisterForm;