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
               <Typography className={classes.typographyClass} variant="h4">Thank you for visiting TekBlogz! A blog where we can share information about the technologies in software development....</Typography>
            </Grid>
            <Grid item className={classes.longText}>
               <Typography variant="body1">This Application enables users to create and manage blogs based on topics of interest having to do with Full Stack Web Developement.</Typography>          
            </Grid>
            <Grid item className={classes.longText}>
               <Typography variant="body1">Set up an account with us and share your ideas, tips and tricks in one or more of our categories. Our admins will review your draft and it will be published within a week. Or explore our website for quality content posted by other knowledgeable members. </Typography>          
            </Grid>
            <Grid item className={classes.longText}>
               <Typography variant="body1">If your draft is not published within a week, you want to suggest more categories or you want a similar CMS (Content Management System) for your business. Please feel free to  <span>
               <a href="mailto:franki@gmail.com" style={{color:"inherit"}}>Contact Me.</a>
                 </span></Typography>          
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  );
}

export default InfoPage;
