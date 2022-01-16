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
      <Grid container direction="column" alignItems="center" style={{marginTop:"3rem"}} spacing={2}>
        <Grid item>
          <Typography variant="h4">Hi Everyone</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">My name is Franke aoishfa sdhf ahsdl fkahs lkfj aklsfdgj alkf glkas gfklga skflg klasfgalkfkas fgalskf jgask fgklas fglas f</Typography>
        </Grid>
        <Grid item>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREglc1sxZt7EeowD56vPfQ5LVDiXxLTifDmw&usqp=CAU" alt="My picture" width="200"/>
        </Grid>
      </Grid>
  );
}

export default AboutPage;
