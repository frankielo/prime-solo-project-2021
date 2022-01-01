import React,{useState} from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function Drawer(props) {

  const user  = useSelector(state => state.user)

  const routes = 
      [
        { name: "Create New Post", link: "/postform"},
        { name: "Manage Posts", link: "/manageposts"},
        // { name: "Profile", link: "/noooooo"}
      ]

  const adminRoutes = 
    [
        { name: "Manage Categories", link: "/categories"},
        { name: "Publish Posts", link: "/adminpost"},
        // { name: "Manage Users", link: "/noooooo"}
    ]


  const drawer = (
    <React.Fragment>
      <SwipeableDrawer open={props.openDrawer} 
      onClose={()=>props.setOpenDrawer(false)} onOpen={()=> props.setOpenDrawer(true)}
      >

        <List >
           {routes.map((route,index)=>(
                <ListItem key = {index} button component={Link} to={route.link}>
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
                <ListItem key = {index} button component={Link} to={route.link}>
                    <ListItemText primary={route.name} />
                </ListItem>             
           ))}
         </List>
         </>
          }

        {/* <List>
        {['Create New Post', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      </SwipeableDrawer>

    </React.Fragment>
  )

  return (
    <div>
      {drawer}
    </div>
  );
}