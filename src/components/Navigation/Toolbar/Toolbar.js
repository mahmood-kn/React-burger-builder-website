import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToggleButton toggle={props.toggleClicked}>MENU</ToggleButton>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </div>
  </header>
);
export default toolbar;
