import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { DrawerComponent } from 'common-app/components';
import { MenuContainer } from 'pods/menu';
import * as classes from './header.styles';
import { switchRoutes } from 'core/router';
import { useHistory } from 'react-router-dom';
import { cx } from 'emotion';
import { userContext, createDefaultUser } from 'core/user';

interface Props {
  name: string;
  hasDrawer: boolean;
  hasReturnToList: boolean;
}

export const HeaderComponent: React.FunctionComponent<Props> = (props) => {
  const { name, hasDrawer, hasReturnToList } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const { setUser } = React.useContext(userContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUser(createDefaultUser());
    history.push(switchRoutes.login);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleNavigateToBarList = () => {
    history.push(switchRoutes.barInfoList);
  };

  return (
    <>
      <AppBar position='fixed' className={cx(classes.appBar)}>
        <Toolbar>
          {hasDrawer && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerToggle}
              edge='start'
              className={cx(classes.menuButton, openDrawer && classes.hide)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6' className={classes.title}>
            {name}
          </Typography>
          <div className={classes.user}>
            {hasReturnToList && (
              <IconButton
                aria-label="return to bar list"
                color='inherit'  
                onClick={handleNavigateToBarList}
              >
                <HomeIcon />
              </IconButton>
            )}
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'>
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={open}
              onClose={handleClose}>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {hasDrawer && (
        <DrawerComponent open={openDrawer} close={handleDrawerToggle}>
          <MenuContainer hasDrawer={hasDrawer} />
        </DrawerComponent>
      )}
    </>
  );
};
