import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import Hidden from '@mui/material/Grid';

import rightsReserved from '../../assets/rightsReserved.png'
import facebook from '../../assets/fbIcon.png'
import twitter from '../../assets/twitterIcon.png'
import instagram from '../../assets/instaIcon.png'
import linkedin from '../../assets/linkedinIcon.png'

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
        marginTop:"21rem",
        border:"2px solid #DEE2E6",
        padding:"1rem"
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
    <Grid container justifyContent="space-between" style={{width:"80%",margin:"auto"}}>
        <Grid item container xs={2}>
        <Grid item>
            <img src={rightsReserved} alt="All rights reserved"/>
        </Grid>
        </Grid>
        <Grid item container xs={2} justifyContent="space-around">
        <Grid item>
            <img src={facebook} alt="Facebook Icon" />
        </Grid>
        <Grid item>
            <img src={twitter} alt="Twitter Icon" />
        </Grid>
        <Grid item>
            <img src={linkedin} alt="Linkedin Icon" />
        </Grid>
        <Grid item>
            <img src={instagram} alt="Instagram Icon" />
        </Grid>
        </Grid>
    </Grid>

    </footer>
    )
}





// <Grid container direction = "column" spacing ={3} style={{minHeight:"8rem"}} justifyContent="center">

// <Grid container item className={classes.mainContainer} justifyContent="center" spacing = {6}>


//             <Grid item  component={Link} to='/'  className={classes.link} >
//                 Home
//             </Grid>

//             <Grid item component={Link} to='/blogs' className={classes.link}>
//                 Blogs    
//             </Grid>
//             <Grid item  component={Link} to='/info' className={classes.link}>
//                 Info Page  
//             </Grid>
//             <Grid item  component={Link} to='/about'className={classes.link}>
//                 About Us
//             </Grid>

//      </Grid>




// {/* </Hidden> */}


// <Grid container item justifyContent="center" className={classes.socialContainer} spacing={2}>
//     <Grid item component={"a"} href="http://www.facebook.com" rel="noopener noreferrer" target="_blank">
//         <img alt="facebook logo" src={facebook} className={classes.icon}></img>
//     </Grid>
//     <Grid item component={"a"} href="http://www.twitter.com">
//         <img alt="twitter logo" src={twitter} className={classes.icon}></img>
//     </Grid>
//     <Grid item component={"a"} href="http://www.instagram.com">
//         <img alt="instagram logo" src={instagram} className={classes.icon}></img>
//     </Grid>
// </Grid>
// </Grid>