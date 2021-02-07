import React from 'react';
import { AppBar, Toolbar, useScrollTrigger } from '@material-ui/core';

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

const Header = () => {
  return (
    <ElevationScroll>
      <AppBar>
        <Toolbar>Arc development</Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
