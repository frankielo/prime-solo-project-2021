import React,{useState} from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import navigationIcon from '../../assets/navigationIcon.png'
import manageCategories from '../../assets/manageCategories.png'
import managePosts from '../../assets/managePosts.png'
import publishPost from '../../assets/publishPost.png'
import createPosts from '../../assets/createPosts.png'

const useStyles = makeStyles(theme=>({
  navigation:{
    marginLeft:"2rem",
    marginTop:"1rem",
    marginBottom:"1rem"
  }
}))


export default function Drawer(props) {

  const user  = useSelector(state => state.user)
  const classes = useStyles()


  const routes = 
      [
        { name: "Create New Post", link: "/postform"},
        { name: "Manage Posts", link: "/manageposts"}
      ]

  const adminRoutes = 
    [
        { name: "Manage Categories", link: "/categories"},
        { name: "Publish Posts", link: "/adminpost"}
    ]


    const giveIcon = (name) => {
      switch (name) {
        case 'Create New Post':
          return  <img src={createPosts} alt="Create New Post" />;
          case 'Manage Posts':
            return <img src={managePosts} alt="Manage Posts" /> ;
            case 'Manage Categories':
              return <img src={manageCategories} alt="Manage Categories"/>;
              case 'Publish Posts':
                return <img src={publishPost} alt="Publish Posts" /> ;      
        default:
          break;
      }
    }


  const drawer = (
    <React.Fragment>
      <SwipeableDrawer open={props.openDrawer} 
      onClose={()=>props.setOpenDrawer(false)} onOpen={()=> props.setOpenDrawer(true)}
      
      PaperProps={{
        sx: {
          backgroundColor: "#F1F3F5",
          color: "white"
        }
      }}
      
      
      >

        <List >
            <ListItem className={classes.navigation}>
                   <ListItemIcon>
                      <img src={navigationIcon} alt="Navigation" />
                   </ListItemIcon>
                    <ListItemText primary="Navigation" />
              </ListItem>   
           {routes.map((route,index)=>(
                <ListItem key = {index} button component={Link} to={route.link} >
                   <ListItemIcon>
                      {giveIcon(route.name)}  
                   </ListItemIcon>
                    <ListItemText primary={route.name} />
                </ListItem>             
           ))}
         </List>
         {
          user.user_role === "admin" && 
          <>
         <Divider />
         <List >
           {adminRoutes.map((route,index)=>(
                <ListItem key = {index} button component={Link} to={route.link} 
           >
                    <ListItemIcon>
                      {giveIcon(route.name)}
                      
                   </ListItemIcon>
                    <ListItemText primary={route.name} />
                </ListItem>             
           ))}
         </List>
         </>
          }
      </SwipeableDrawer>

    </React.Fragment>
  )

  return (
    <div>
      {drawer}
    </div>
  );
}