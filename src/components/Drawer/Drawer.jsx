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
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import CategoryIcon from '@mui/icons-material/Category';
import PublishIcon from '@mui/icons-material/Publish';

// const useStyles = makeStyles(theme=>({
//   drawer:{
//     backgroundColor :theme.palette.common.blue
//   },
//   drawerItem:{
//     ...theme.typography.tab,
//     color:"white",
//     opacity:0.7
//   }
// }))


export default function Drawer(props) {

  const user  = useSelector(state => state.user)
  // const classes = useStyles()


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
          return <CreateNewFolderIcon/>;
          case 'Manage Posts':
            return <SettingsApplicationsIcon/>;
            case 'Manage Categories':
              return <CategoryIcon/>;
              case 'Publish Posts':
                return <PublishIcon/>;

      
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
          backgroundColor: "#33a137",
          color: "white"
        }
      }}
      
      
      >

        <List >
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