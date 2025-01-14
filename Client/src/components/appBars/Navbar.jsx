import  { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../../assets/css/navbar.scss';
import SearchInput from '../search/Search_Input';
import useNavigateClicks from '../../hooks/navigate-clicks';

// const NavbarItems = [
//     {
//         id: 1,
//         name: "Home",
//         path:"/"

//     }
// ]

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
      <List className="navbar__drawer"
    sx={{
      width: {
        xs: "90vw", // Applies to extra-small (xs) and small (sm) screens
        sm: "60vw", // Applies from the small (sm) breakpoint and larger
      },
    }}
    
      >
  <ListItem
    button
    onClick={() => {
      handleClick('/');
      setDrawerOpen(false);
    }}
  >
    <ListItemText primary="Home" />
  </ListItem>
  <ListItem
    button
    onClick={() => {
      handleClick('/admin/products/add');
      setDrawerOpen(false);
    }}
  >
    <ListItemText primary="Admin" />
  </ListItem>
  <ListItem
    button
    onClick={() => {
      handleClick('/cart');
      setDrawerOpen(false);
    }}
  >
    <ListItemText primary="Cart" />
  </ListItem>
  <ListItem
    button
    onClick={() => {
      window.scrollTo({
        top: document.body.scrollHeight, // Scroll to the bottom of the page
        behavior: 'smooth', // Smooth scrolling
      });
      setDrawerOpen(false);
    }}
  >
    <ListItemText primary="Contact" />
  </ListItem>
</List>

      </Drawer>
    </AppBar>
  );
}

export default Navbar;
