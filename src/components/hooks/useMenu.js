import { useState } from 'react';

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  return {
    openMenu,
    anchorEl,
    handleClick,
    handleClose,
    setAnchorEl,
    setOpenMenu,
  };
};

export default useMenu;
