import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCurrency } from '../redux/slices/currencySlice';
import useOnlineStatus from '../hooks/useOnlineStatus';
import CircleIcon from '@mui/icons-material/Circle';
import { green, red } from '@mui/material/colors';
import './Navbar.css';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { availableCurrencies, selectedCurrency } = useSelector((state) => state.currency);
  const isOnline = useOnlineStatus();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCurrencyChange = (event) => {
    dispatch(setSelectedCurrency(event.target.value));
  };

  const menuItems = [
    { text: 'Home', path: '' },
    { text: 'Participants', path: 'participants' },
    { text: 'Transactions', path: 'transactions' },
    { text: 'Balance', path: 'balance' },
  ];

  const drawer = (
    <div onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem>
          <Select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            displayEmpty
            fullWidth
          >
            {availableCurrencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </ListItem>
        <ListItem>
          <Typography variant="body2" display="flex" alignItems="center">
            <CircleIcon sx={{ color: isOnline ? green[500] : red[500], mr: 1 }} />
            {isOnline ? 'Online' : 'Offline'}
          </Typography>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Pay As We Go
          </Typography>
          {!isMobile &&
            menuItems.map((item) => (
              <Button color="inherit" component={Link} to={item.path} key={item.text}>
                {item.text}
              </Button>
            ))}
          {!isMobile && (
            <>
              <Select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                variant="outlined"
                size="small"
                style={{ marginLeft: '1rem', color: 'white', borderColor: 'white' }}
              >
                {availableCurrencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body2" display="flex" alignItems="center" sx={{ ml: 2 }}>
                <CircleIcon sx={{ color: isOnline ? green[500] : red[500], mr: 0.5 }} />
                {isOnline ? 'Online' : 'Offline'}
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
