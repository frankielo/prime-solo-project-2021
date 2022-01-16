import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import Hidden from '@mui/material/Grid';
import facebook from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import instagram from '../../assets/instagram.svg'

const useStyles = makeStyles(theme=>({
    footer:{
        backgroundColor: theme.palette.common.blue,
        // width:"100%",
        // position:"absolute",
        //   bottom:"-50",
        //   width:"100%",
          // height:"60px"  /* Height of the footer */

        // zIndex: 1302,
        // position:"relative"
        marginTop:"40rem"
    },
    adornment:{
        width:"25em",
        verticalAlign:"bottom",
        [theme.breakpoints.down("md")]:{
            width:"21em"
        },
        [theme.breakpoints.down("xs")]:{
            width:"15em"
        }
    },
    link:{
        color:"white",
        fontFamily:"arial",
        fontSize:"0.75rem",
        fontWeight:"bold",
        textDecoration:"none"
    },
    gridItem:{
        margin:"3em"
    },
    icon:{
        height:"2.5em",
        width:"2.5em"
    }
   
}))



export default function Footer(props){

    const classes = useStyles()

    return (
    <footer className = {classes.footer} > 
    {/* <Grid container className={classes.mainContainer} justifyContent="center">
         <Grid item className={classes.gridItem}>
            <Grid container direction="column"> 
                <Grid item  component={Link} to='/' onClick = {()=>{props.setValue(0)}} className={classes.link} >
                    Home
                </Grid>
            </Grid>
         </Grid>
         <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}> 
                <Grid item component={Link} to='/blogs' className={classes.link}>
                    Blogs    
                </Grid>
                <Grid item  component={Link} to='/info' className={classes.link}>
                    Info Page  
                </Grid>
                <Grid item  component={Link} to='/about'className={classes.link}>
                    About Us
                </Grid>

            </Grid>
         </Grid>

    </Grid> */}

<Grid container direction = "column" spacing ={3} style={{minHeight:"8rem"}} justifyContent="center">

    <Grid container item className={classes.mainContainer} justifyContent="center" spacing = {6}>

 
                <Grid item  component={Link} to='/'  className={classes.link} >
                    Home
                </Grid>

                <Grid item component={Link} to='/blogs' className={classes.link}>
                    Blogs    
                </Grid>
                <Grid item  component={Link} to='/info' className={classes.link}>
                    Info Page  
                </Grid>
                <Grid item  component={Link} to='/about'className={classes.link}>
                    About Us
                </Grid>

         </Grid>




    {/* </Hidden> */}


    <Grid container item justifyContent="center" className={classes.socialContainer} spacing={2}>
        <Grid item component={"a"} href="http://www.facebook.com" rel="noopener noreferrer" target="_blank">
            <img alt="facebook logo" src={facebook} className={classes.icon}></img>
        </Grid>
        <Grid item component={"a"} href="http://www.twitter.com">
            <img alt="twitter logo" src={twitter} className={classes.icon}></img>
        </Grid>
        <Grid item component={"a"} href="http://www.instagram.com">
            <img alt="instagram logo" src={instagram} className={classes.icon}></img>
        </Grid>
    </Grid>
    </Grid>
    </footer>
    )
}




