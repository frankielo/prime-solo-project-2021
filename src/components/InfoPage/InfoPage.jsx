import React from 'react';
import {Grid,Typography} from '@mui/material'
import informationImage from '../../assets/informationImage.png'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme=>({
  mainContainer:{
    width : "80%",
    margin:"auto"
  },
  mainHeading : {
    marginBottom : "2rem !important" 
  },
  paragraphContainer:{
    marginLeft:"4rem !important",
    marginTop : "4rem !important"
  },
  typographyClass:{
    color: "#000000 !important"
  },
  longText:{
    width:"70%",
    marginTop:"1rem !important"
  }
}))

function InfoPage() {

  const classes = useStyles()

  return (
    <Grid direction="column" className={classes.mainContainer}>
      <Grid item className={classes.mainHeading}>
        <Typography variant="h3" className={classes.typographyClass}>Information</Typography>
      </Grid>
      <Grid item container>
          <Grid item xs={6}>
              <img src={informationImage} alt="Image for information page"/>
          </Grid>
          <Grid container item direction="column" xs={5} className={classes.paragraphContainer}>
            <Grid item >
               <Typography className={classes.typographyClass} variant="h4">Lorem ipsum dolor sit amet, consetetur sadipscing...</Typography>
            </Grid>
            <Grid item className={classes.longText}>
               <Typography variant="body1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Typography>          
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  );
}

export default InfoPage;
