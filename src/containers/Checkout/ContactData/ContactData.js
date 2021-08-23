import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
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
    this.setState({ loading: true });
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: "$" + this.props.price,
      customer: formData,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
        this.props.history.replace("/");
      });
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

    return this.state.loading ? spinner : data;
  }
}

export default ContactData;
