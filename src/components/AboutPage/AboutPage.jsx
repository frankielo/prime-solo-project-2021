import React from 'react';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Grid container direction="column" alignContent="center" style={{marginTop: "3rem"}} spacing={2}>
      <Grid item>
        <Typography variant="h4">Hello World</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">My name is Frankie Lopez and I am a Full Stack Web Developer.</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">Technologies</Typography>
        <ul>
          <li>Node</li>
          <li>Express</li>
          <li>React w/ Hooks, Redux, Saga</li>
          <li>Passport w/ Local Authentication</li>
          <li>Postgresql</li>
          <li>Heroku</li>
          <li>Moment.js</li>
          <li>MUI, MUI Icons</li>
        </ul>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
