import React, { useEffect, useReducer } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Auth.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const initialState = {
  controls: {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email',
      },
      value: '',
      touched: false,
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      invalidMsg: 'Your email is not valid',
    },

    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your password',
      },
      value: '',
      touched: false,
      validation: {
        required: true,
        minLength: 6,
        maxLength: 10,
      },
      valid: false,
      invalidMsg: 'Your password must be more than 6 characters',
    },
  },
  isSignUp: true,
};

const contactReducer = (currentState, action) => {
  switch (action.type) {
    case 'SWITCH_HANDLER':
      return { ...currentState, isSignUp: !currentState.isSignUp };
    case 'INPUT_CHANGE_HANDLER':
      return {
        ...currentState,
        controls: updateObject(currentState.controls, {
          [action.id]: updateObject(currentState.controls[action.id], {
            value: action.value,
            valid: checkValidity(
              action.value,
              currentState.controls[action.id].validation
            ),
            touched: true,
          }),
        }),
      };
    default:
      throw new Error('should not come here!');
  }
};

const Auth = (props) => {
  const [contactState, dispatch] = useReducer(contactReducer, initialState);

  const { onSetAuthRedirectPath, isAuthenticated, buildingBurger } = props;

  useEffect(() => {
    if (!isAuthenticated && !buildingBurger) {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath, isAuthenticated, buildingBurger]);

  const switchSignUpHandler = () => {
    dispatch({ type: 'SWITCH_HANDLER' });
  };

  const inputChangeHandler = (e, id) => {
    dispatch({ type: 'INPUT_CHANGE_HANDLER', value: e.target.value, id });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(
      contactState.controls.email.value,
      contactState.controls.password.value,
      contactState.isSignUp
    );
  };

  const formArray = [];
  for (let key in contactState.controls) {
    formArray.push({
      id: key,
      config: contactState.controls[key],
    });
  }
  let form = formArray.map((formEl) => {
    return (
      <Input
        key={formEl.id}
        label={formEl.id.toUpperCase()}
        elementConfig={formEl.config.elementConfig}
        elementType={formEl.config.elementType}
        value={formEl.config.value}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
        valueType={formEl.id}
        invalidMsg={formEl.config.invalidMsg ? formEl.config.invalidMsg : null}
        changed={(e) => inputChangeHandler(e, formEl.id)}
      />
    );
  });
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMsg = null;
  if (props.error) {
    errorMsg = <p className={classes.ErrorMsg}>{props.error.message}</p>;
  }
  let redirectOnAuth = null;
  if (props.isAuthenticated) {
    redirectOnAuth = <Redirect to={props.authRedirectPath} />;
  }
  let formHeader = <h1 className={classes.FormHeader}>SIGN UP</h1>;
  if (!contactState.isSignUp) {
    formHeader = <h1 className={classes.FormHeader}>SIGN IN</h1>;
  }

  return (
    <div className={classes.Auth}>
      {redirectOnAuth}
      {formHeader}
      {errorMsg}
      <form onSubmit={submitHandler}>
        {form}
        <Button type='Success'>SUBMIT</Button>
      </form>
      <Button clicked={switchSignUpHandler} type='Danger'>
        Switch to {contactState.isSignUp ? 'SignIn' : 'SignUp'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
