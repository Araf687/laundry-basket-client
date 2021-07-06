import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {
    Link, useHistory
  } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../../App';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './Navbar.css';

const useStyles = makeStyles((theme) => ({
  root:{
      width:'100',
      margin:'0 auto',
      '& a':{
          textDecoration:'none',
          color:'black'
      }
  },
  grow: {
    flexGrow: 1,
  },
  appBar:{
    backgroundColor:'white',
    color:'black',
    boxShadow:'none',
  },
  navLink:{
      margin:'5px 20px',
      '&:hover':{
          color:'blue'
      }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }, 
  loginBtn:{
      height:'32px',
      marginLeft:'20px',
      backgroundColor: '#03a9f4',
      "&:hover":{
        backgroundColor: '#03a9f4',
      }
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [loggedInUser,setLoggedInUser,,]=useContext(UserContext);
  const history=useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Home</MenuItem>
      <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleExit=()=>{
    setLoggedInUser({});
    sessionStorage.clear();
    history.replace('/home');
  }

  return (
    <div className={classes.grow}>
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                <a href="/home"><h2 style={{ fontFamily: 'Kaushan Script, cursive', textAlign:'center',fontWeight:'bolder'}}>Laundy Basket</h2></a>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                      <Link to='/home'><p className={classes.navLink}>Home</p></Link> 
                      <Link to='/aboutUs'><p className={classes.navLink}>About Us</p></Link>
                      <Link to='/contact'><p className={classes.navLink}>Contact</p></Link>
                      
                    {loggedInUser.email?
                    <div style={{display:'flex'}}>
                      <Avatar src={loggedInUser.photoURL} style={{cursor:'pointer'}} onClick={()=>history.push('/dashboard')}/>
                      <h4 style={{margin:'7px',marginLeft:'10px'}}>{loggedInUser.name||loggedInUser.email}</h4>
                      <IconButton onClick={()=>handleExit()} style={{padding:'0',fontSize:'30'}} color="secondary" aria-label="add an alarm">
                          <ExitToAppIcon  />
                      </IconButton>
                    </div>
                    :<Link to='/login'>
                        <Button className={classes.loginBtn} variant="contained" color="primary">
                            Log In
                        </Button>
                    </Link>}

                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    >
                    <MoreIcon />
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
        </div>
      {renderMobileMenu}
      {renderMenu}
    </div>
    );
};

export default Navbar;