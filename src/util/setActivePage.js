const setActivePage = (pathname, value, setValue, setSelectedIndex) => {
  switch (pathname) {
    case '/':
      if (value !== 0) return setValue(0);
      break;
    case '/services':
      if (value !== 1) {
        setSelectedIndex(0);
        setValue(1);
      }
      break;
    case '/revolution':
      if (value !== 2) setValue(2);
      break;
    case '/about':
      if (value !== 3) return setValue(3);
      break;
    case '/contact':
      if (value !== 4) return setValue(4);
      break;
    case '/estimate':
      if (value !== 5) return setValue(5);
      break;
    case '/custom-software':
      if (value !== 1) {
        setValue(1);
        setSelectedIndex(1);
      }
      break;
    case '/mobile-apps':
      if (value !== 1) {
        setValue(1);
        setSelectedIndex(2);
      }
      break;
    case '/websites':
      if (value !== 1) {
        setValue(1);
        setSelectedIndex(3);
      }
      break;

    default:
      break;
  }
};
export default setActivePage;
