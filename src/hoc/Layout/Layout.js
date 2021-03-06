import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = (props) => {
  const [showSlideDrawer, setShowSlideDrawer] = useState(false);

  const slideDrawerCloseHandler = () => {
    setShowSlideDrawer(false);
  };

  const toggleMenuHandler = () => {
    setShowSlideDrawer(!showSlideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        toggleClicked={toggleMenuHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSlideDrawer}
        closed={slideDrawerCloseHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
