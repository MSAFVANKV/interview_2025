import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../../assets/css/navbar.scss';
import SearchInput from '../search/Search_Input';
import useNavigateClicks from '../../hooks/navigate-clicks';
import { useSelector } from 'react-redux';

const NavbarItems = [
    {
        id: 1,
        name: "Home",
        path:"/"

    }
]

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {handleClick} = useNavigateClicks();
  


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" className="navbar" sx={{
        backgroundColor: '#333',
        margin:0,
        border:"none"
    }}>
      <Toolbar className="navbar__toolbar">
        {/* Logo */}
        <div className="navbar__logo">
          <img src="/img/logo.webp" alt="Logo"
          onClick={()=>{
            handleClick('/')
          }}
          style={{
            cursor:"pointer",
            borderRadius:"50%"
          }}
          />
        </div>

        {/* Links */}
        {/* <div className="navbar__links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div> */}

        {/* Hamburger Menu */}
        <div className="">
            <SearchInput 
            type="search"
            placeholder="Search"
            />
        </div>
        <IconButton
            sx={{
                display:{
                    md:'none',

                }
            }}
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          className="navbar__hamburger"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Sidebar */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className="navbar__drawer">
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
