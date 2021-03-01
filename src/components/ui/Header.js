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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useMenu } from '../hooks';

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
  },
  logo: { height: '7em' },
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
}));

const Header = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { open, anchorEl, handleClick, handleClose } = useMenu();
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  // persist navigation Url after reload
  useEffect(() => {
    if (pathname === '/' && value !== 0) {
      setValue(0);
    } else if (pathname === '/services' && value !== 1) {
      setValue(1);
    } else if (pathname === '/revolution' && value !== 2) {
      setValue(2);
    } else if (pathname === '/about' && value !== 3) {
      setValue(3);
    } else if (pathname === '/contact' && value !== 4) {
      setValue(4);
    } else if (pathname === '/estimate' && value !== 5) {
      setValue(5);
    }
  }, [pathname]);

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
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={Link}
                to="/"
              />
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
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              <MenuItem
                component={Link}
                to="/services"
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
              >
                Services
              </MenuItem>
              <MenuItem
                component={Link}
                to="/custom-software"
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
              >
                Custom Development
              </MenuItem>
              <MenuItem
                component={Link}
                to="/mobile-apps"
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
              >
                Mobile App Development
              </MenuItem>
              <MenuItem
                component={Link}
                to="/websites"
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
              >
                Website Development
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin} />
    </>
  );
};

export default Header;
