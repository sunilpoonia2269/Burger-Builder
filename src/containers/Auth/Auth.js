import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        value: "",
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthPath("/");
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event, identifier) => {
    const updatedForm = { ...this.state.controls };
    const updatedElement = { ...this.state.controls[identifier] };
    updatedElement.value = event.target.value;
    updatedForm[identifier] = updatedElement;
    updatedElement.valid = this.checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    updatedElement.touched = true;

    this.setState({ controls: updatedForm });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  onSwitchModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = (
      <form onSubmit={this.onSubmitHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    );

    const spinner = <Spinner />;

    let heading = (
      <h1>Enter your {this.state.isSignup ? "Register" : "Login"} details</h1>
    );
    if (this.props.error) {
      heading = <p>{this.props.error.message}</p>;
    }

    const authRedirect = this.props.isAuthenticated && (
      <Redirect to={this.props.authRedirectPath} />
    );

    return (
      <div className={Classes.Auth}>
        {authRedirect}
        {heading}
        {this.props.loading ? spinner : form}
        <Button clicked={this.onSwitchModeHandler} btnType="Danger">
          Switch to {this.state.isSignup ? "Sign In" : "Sign up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirctPath,
    building: state.burgerReducer.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
