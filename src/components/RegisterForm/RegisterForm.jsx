import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField'
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
      <Grid container direction="column" spacing={2} alignContent="center">
        <Grid item>
      <h2>Register User</h2>
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

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// function RegisterForm() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const errors = useSelector((store) => store.errors);
//   const dispatch = useDispatch();

//   const registerUser = (event) => {
//     event.preventDefault();

//     dispatch({
//       type: 'REGISTER',
//       payload: {
//         username: username,
//         password: password,
//       },
//     });
//   }; // end registerUser

//   return (
//     <form className="formPanel" onSubmit={registerUser}>
//       <h2>Register User</h2>
//       {errors.registrationMessage && (
//         <h3 className="alert" role="alert">
//           {errors.registrationMessage}
//         </h3>
//       )}
//       <div>
//         <label htmlFor="username">
//           Username:
//           <input
//             type="text"
//             name="username"
//             value={username}
//             required
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label htmlFor="password">
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={password}
//             required
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <input className="btn" type="submit" name="submit" value="Register" />
//       </div>
//     </form>
//   );
// }

// export default RegisterForm;
