import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import techlogo from '../../assets/tekBlogz.png'
import './Header.css'
import Drawer from '../Drawer/Drawer'
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {useLocation} from 'react-router'

const useStyles = makeStyles(theme=>({
  appbar:{
    zIndex:theme.zIndex.modal + 1,
    marginBottom:"3rem",
    border:"2px solid #DEE2E6"
  },
  navLinks : {
    textDecoration:"none",
    marginRight : "3rem",
    cursor:"pointer",
    color : "white",
    opacity: "0.8"
  }
}))


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function Header() {


  const [openDrawer, setOpenDrawer] = useState(false)
  const user = useSelector((store) => store.user); 
  const dispatch = useDispatch();
  const classes = useStyles()
  const location = useLocation()
  

  const onSearchBlogs = (e) => {
    dispatch ( {type : 'SEARCH_QUERY',
                payload : e.target.value })
  }

  return (

    
      <AppBar position="static" className={classes.appbar} variant="dense">
        <Toolbar>
        {user.id && (
          <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {()=>{setOpenDrawer(prevState=>!prevState)}}
          >
            <MenuIcon />
          </IconButton>
          </>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/blogs" className="headerLink">
                <img src={techlogo} alt="tech logo" width="150"/>
                {/* <h2 className="nav-title">Prime Solo Project</h2> */}
            </Link>
          </Typography>
          {location.pathname === "/blogs" &&
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Blogs"
              inputProps={{ 'aria-label': 'search' }}
              onChange = {onSearchBlogs}
            />
          </Search>
          }

        <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
            <Typography variant = "body1" component = {Link} to = "/blogs" className = {classes.navLinks}>
              Blogs 
            </Typography>
            </Grid>
            <Grid item>
            <Typography variant = "body1" component = {Link} to = "/info" className = {classes.navLinks}>
              Info Page 
            </Typography>
            </Grid>
            <Grid item>
            <Typography variant = "body1" component = {Link} to = "/about" className = {classes.navLinks}>
              About
            </Typography>
            </Grid>
            <Grid item>
            {!user.id ?
            <Typography variant = "body1" component = {Link} to = "/login" className = {classes.navLinks}>
              Login
            </Typography> :
            <Typography variant = "body1" className = {classes.navLinks}
              onClick={() => dispatch({ type: 'LOGOUT' })} 
            >
              Logout 
            </Typography>
            }
            </Grid>
            </Grid>

{/*         
        <Link to="/blogs" className="headerLink">
          Blogs
        </Link>


        <Link to="/about" className="headerLink">
          About
        </Link> */}


        </Toolbar>
        <Drawer openDrawer = {openDrawer} setOpenDrawer = {setOpenDrawer}/>
      </AppBar>



  );
}
