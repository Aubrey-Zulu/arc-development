import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useMenu } from '../hooks';
import setActivePage from '../../util/setActivePage';

const ElevationScroll = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const useStyles = makeStyles((theme) => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: { marginBottom: '2em' },
    [theme.breakpoints.down('xs')]: { marginBottom: '1.25em' },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: { height: '7em' },
    [theme.breakpoints.down('xs')]: { height: '5.5em' },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    color: 'white',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '25px',
    marginRight: '25px',
    height: '45px',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': { opacity: 1 },
  },
  drawerContainer: {
    marginLeft: 'auto',
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.transitions.tab,
    color: 'white',
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
}));
const menuOptions = [
  { name: 'Services', link: '/services' },
  {
    name: 'Custom software development',
    link: '/custom-software',
  },
  { name: 'Mobile app development', link: '/mobile-apps' },
  { name: 'Website development', link: '/websites' },
];

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useLocation();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  // eslint-disable-next-line no-undef
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const {
    openMenu,
    anchorEl,
    handleClick,
    handleClose,
    setAnchorEl,
    setOpenMenu,
  } = useMenu();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(index);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setActivePage(pathname, value, setValue, setSelectedIndex);
  }, [pathname]);
  const drawer = (
    <>
      <SwipeableDrawer
        open={openDrawer}
        classes={{ paper: classes.drawer }}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <List disablePadding>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/services"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Services
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/revolution"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              The Revolution
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/about"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              About Us
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/contact"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Contact
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            className={classes.drawerItemEstimate}
            component={Link}
            to="/estimate"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerContainer}
        color="inherit"
        disableRipple
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab className={classes.tab} label="Home" component={Link} to="/" />
        <Tab
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? true : undefined}
          className={classes.tab}
          label="Services"
          onMouseOver={(event) => handleClick(event)}
          component={Link}
          to="/services"
        />
        <Tab
          className={classes.tab}
          label="The revolution"
          component={Link}
          to="/revolution"
        />
        <Tab
          component={Link}
          to="/about"
          className={classes.tab}
          label="About us"
        />
        <Tab
          className={classes.tab}
          label="Contact us"
          component={Link}
          to="contact"
        />
      </Tabs>
      <Button
        color="secondary"
        className={classes.button}
        disableElevation
        variant="contained"
      >
        Free estimate
      </Button>
      <Menu
        id="simple-menu"
        classes={{ paper: classes.menu }}
        anchorEl={anchorEl}
        open={openMenu}
        elevation={0}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            selected={index === selectedIndex && value === 1}
            onClick={(event) => {
              setValue(1);
              handleMenuItemClick(event, index);
              handleClose();
            }}
            classes={{ root: classes.menuItem }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar disableGutters>
            <Button
              disableRipple
              className={classes.logoContainer}
              component={Link}
              to="/"
            >
              <img className={classes.logo} src={logo} alt="company logo" />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin} />
    </>
  );
};

export default Header;
