import Personnummer from "personnummer";
import { validator } from "telefonnummer";
import { submitFormError } from "../actions";

const isValidSSN = (ssn: string) => {
  return Personnummer.valid(ssn);
};

const isValidPhoneNumber = (phoneNumber: string) => {
  return validator(phoneNumber);
};

const isValidEmail = (email: string) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isValidCountry = (country: string) => {
  if (
    country === "" ||
    country === "Select an item..." ||
    country === undefined
  ) {
    return false;
  }

  return true;
};

export const validateSSN = (dispatch: Function, ssn: string) => {
  if (!isValidSSN(ssn)) {
    dispatch(submitFormError("ssn", "Invalid SSN"));
  } else {
    dispatch(submitFormError("ssn", ""));
  }
};

export const validatePhoneNumber = (
  dispatch: Function,
  phoneNumber: string
) => {
  if (!isValidPhoneNumber(phoneNumber)) {
    dispatch(submitFormError("phoneNumber", "Invalid Swedish phone number"));
  } else {
    dispatch(submitFormError("phoneNumber", ""));
  }
};

export const validateEmail = (dispatch: Function, email: string) => {
  if (!isValidEmail(email)) {
    dispatch(submitFormError("email", "Invalid email address"));
  } else {
    dispatch(submitFormError("email", ""));
  }
};

export const validateCountry = (dispatch: Function, country: string) => {
  if (!isValidCountry(country)) {
    dispatch(submitFormError("country", "Select a country"));
  } else {
    dispatch(submitFormError("country", ""));
  }
};

export const validateAll = (
  dispatch: Function,
  ssn: string,
  phoneNumber: string,
  email: string,
  country: string
) => {
  let isValidForm =
    isValidSSN(ssn) &&
    isValidPhoneNumber(phoneNumber) &&
    isValidEmail(email) &&
    isValidCountry(country);

  if (!isValidForm) {
    validateSSN(dispatch, ssn);
    validatePhoneNumber(dispatch, phoneNumber);
    validateEmail(dispatch, email);
    validateCountry(dispatch, country);
    return false;
  }

  return isValidForm;
};

export default {
  validateSSN,
  validatePhoneNumber,
  validateEmail,
  validateCountry,
  validateAll,
};
