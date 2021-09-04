import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import WithErrorHandler from "../../../hoc/withErrorHandler/WithErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
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
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      pinCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code",
        },
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
          isNumeric: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "Fastest",
              displayValue: "Fastest",
            },
            {
              value: "Chepest",
              displayValue: "Chepest",
            },
          ],
        },
        valid: true,
        validation: {},
        touched: false,
        value: "Fastest",
      },
    },
    loading: false,
    formIsValid: false,
  };

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
    // Copying state object to change state immutabliy
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = { ...this.state.orderForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[identifier] = updatedFormElement;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: "$" + this.props.price.toFixed(2),
      customer: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    const data = (
      <div className={Classes.ContactData}>
        <h1>Enter your contact details</h1>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
            />
          ))}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            SUBMIT
          </Button>
        </form>
      </div>
    );
    const spinner = <Spinner />;

    return this.props.loading ? spinner : data;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
