import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import { AiOutlinePlus } from 'react-icons/ai';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import {BsXDiamond} from 'react-icons/bs';
import {BsLayoutTextWindowReverse} from 'react-icons/bs';
import {BiSmile} from 'react-icons/bi';
import {RiTruckLine} from 'react-icons/ri';

import {
  Link
} from "react-router-dom";
import { useContext } from 'react';
import { UserContextDashboard } from '../Dashboard/Dashboard';


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      color:'white',
      ['& a']:{
        textDecoration:'none',
        color:'white',
      }
     
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor:'#003868',
      color:'white',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    icon:{
      color:'white',
      fontSize:'24px'
    }
  }));

const Sidebar = (props) => {
    const classes = useStyles();
    const  setSelectedOption=props.option;
    const [isAdmin,]=useContext(UserContextDashboard);
   
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}>
                  
                <a href="/home"><h2 style={{ font: 'normal 30px Cookie, cursive',textAlign:'center'}}>Laundry Basket</h2></a>
                </div>
                <Divider />
                <List>
                  {isAdmin&&<><Link onClick={()=>{setSelectedOption("Basket list")}} to="/orders">
                    <ListItem button>
                    <ListItemIcon><ListAltSharpIcon className={classes.icon}/></ListItemIcon>
                    <ListItemText primary={"Basket list"} />
                    </ListItem>
                  </Link>
                  <Link onClick={()=>{setSelectedOption("Add Service")}} to="addService">
                    <ListItem button>
                    <ListItemIcon><AiOutlinePlus style={{fontSize:'20px',color:'white',}}/></ListItemIcon>
                    <ListItemText primary={"Add Service"} />
                    </ListItem>
                  </Link>
                  <Link onClick={()=>{setSelectedOption("Make Admin")}} to="makeAdmin">
                    <ListItem button>
                    <ListItemIcon><BsFillPersonPlusFill className={classes.icon}/></ListItemIcon>
                    <ListItemText primary={"Make Admin"} />
                    </ListItem>
                  </Link>
                  <Link onClick={()=>{setSelectedOption("Manage Service")}} to="/manageService">
                    <ListItem button>
                    <ListItemIcon><BsXDiamond className={classes.icon}/></ListItemIcon>
                    <ListItemText primary={"Manage Service"} />
                    </ListItem>
                  </Link></>}
                  {!isAdmin&&<><Link onClick={()=>{setSelectedOption("Book Basket")}} to="/bookBasket">
                    <ListItem button>
                    <ListItemIcon><RiTruckLine style={{fontSize:'28px',color:'white',}}/></ListItemIcon>
                    <ListItemText primary={"Book Basket"} />
                    </ListItem>
                  </Link>
                  <Link onClick={()=>{setSelectedOption("Booking History")}} to="/bookingHistory">
                    <ListItem button>
                    <ListItemIcon><BsLayoutTextWindowReverse style={{fontSize:'20px',color:'white',}}/></ListItemIcon>
                    <ListItemText primary={"Booking History"} />
                    </ListItem>
                  </Link>
                  <Link onClick={()=>{setSelectedOption("Review")}} to="/review">
                    <ListItem button>
                    <ListItemIcon><BiSmile className={classes.icon}/></ListItemIcon>
                    <ListItemText primary={"Review"} />
                    </ListItem>
                  </Link></>}
                </List>
                
            </Drawer>
        </div>
    );
};

export default Sidebar;