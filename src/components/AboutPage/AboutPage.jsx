import React from 'react';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import profilePicture from '../../assets/profilePicture.png'
import nIcon from '../../assets/nIcon.png'
import mIcon from '../../assets/mIcon.png'
import pIcon from '../../assets/pIcon.png'
import hIcon from '../../assets/hIcon.png'
import rIcon from '../../assets/rIcon.png'
import eIcon from '../../assets/eIcon.png'
import Paper from '@mui/material/Paper';
import './AboutPage.css'


function AboutPage() {


  const data1 = [
    {techName: "Node" ,iconName : nIcon},
    {techName: "Express",iconName : eIcon },
    {techName: "React with hooks",iconName : rIcon },
    {techName: "Redux Saga" ,iconName : rIcon}
  ]
  const data2 = [
    {techName: "Passport Authentication" ,iconName : pIcon},
    {techName: "PostgreSQL",iconName : pIcon },
    {techName: "Heroku" ,iconName : hIcon},
    {techName: "MUI, MUI Icons" ,iconName : mIcon}
  ]

  return (
      <Grid direction="column" className="main-container"  >
        <Grid item style={{marginBottom:"1rem"}}>
            <Typography variant="h6" >About Me</Typography>
        </Grid>
        <Grid item style={{marginBottom:"1rem"}}>
          <img src={profilePicture} alt="avatar profile picture" />
        </Grid>
          <Grid item container spacing={1} style={{marginBottom:"1rem"}}>
            <Grid item>
            <Typography variant="h5" >Frankie</Typography>
            </Grid>
            <Grid item>
            <Typography variant="h5" className="owner-surname">Lopez</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" style={{marginBottom:"1rem"}}>
          <Grid item>
              <Typography variant="subtitle1">
                  My name is Frankie Lopez
              </Typography>
          </Grid>
          <Grid item>
              <Typography variant="subtitle1">
                  And I am a Full Stack Web Developer
              </Typography>
          </Grid>
          </Grid>
          <Grid container className="technology-container">
              {
              data1.map((tech,index)=>
              <Grid item xs={3} key={index}>
                <Paper elevation={1} className="paper-container">
                  <Grid container item spacing={2} alignItems="center">
                  <Grid item>
                  <img src={tech.iconName} alt={tech.techName} className="paper-image" />
                  </Grid>
                  <Grid item>
                  <Typography variant="subtitle1">{tech.techName}</Typography>
                  </Grid>
                  </Grid>
                </Paper>
              </Grid>
              )}
          </Grid>
          <Grid container className="technology-container">
              {
              data2.map((tech,index)=>
              <Grid item xs={3} key={index}>
                <Paper elevation={1} className="paper-container">
                  <Grid container item spacing={2} alignItems="center">
                  <Grid item>
                  <img src={tech.iconName} alt={tech.techName} className="paper-image" />
                  </Grid>
                  <Grid item>
                  <Typography variant="subtitle1">{tech.techName}</Typography>
                  </Grid>
                  </Grid>
                </Paper>
              </Grid>
              )}
          </Grid>
      </Grid>
  );
}

export default AboutPage;
