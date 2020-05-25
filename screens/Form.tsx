import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Personnummer from "personnummer";
import { validator } from "telefonnummer";
import { validateEmail, validateCountry } from "../helpers/validate";
import FormInput from "../components/FormInput";
import PickerSelect from "../components/PickerSelect";
import {
  addCountries,
  submitFormSuccess,
  submitFormError,
  updateField,
} from "../actions";

export default function Form() {
  const dispatch = useDispatch();
  const formReducer = useSelector((state: any) => state.formReducer);
  const countriesReducer = useSelector((state: any) => state.countriesReducer);
  const { form, errors } = formReducer;
  const { countries } = countriesReducer;
  useEffect(() => getCountries(), []);

  const getCountries = () => {
    let url = "https://restcountries.eu/rest/v2/all";
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => dispatch(addCountries(data)))
      .catch((error) => console.log(error.message));
  };

  const updateFormInput = (fieldName: string, fieldValue: string) => {
    dispatch(updateField(fieldName, fieldValue));
  };

  const validateErrors = (
    ssn: string,
    phoneNumber: string,
    email: string,
    country: string
  ) => {
    if (!Personnummer.valid(ssn)) {
      dispatch(submitFormError("ssn", "Invalid SSN"));
    } else {
      dispatch(submitFormError("ssn", ""));
    }

    if (!validator(phoneNumber)) {
      dispatch(submitFormError("phoneNumber", "Invalid Swedish phone number"));
    } else {
      dispatch(submitFormError("phoneNumber", ""));
    }

    if (!validateEmail(email)) {
      dispatch(submitFormError("email", "Invalid email address"));
    } else {
      dispatch(submitFormError("email", ""));
    }

    if (!validateCountry(country)) {
      dispatch(submitFormError("country", "Select a country"));
    } else {
      dispatch(submitFormError("country", ""));
    }
  };

  const submitRockerForm = () => {
    const { ssn, email, phoneNumber, country } = form;

    if (
      validateEmail(email) &&
      validator(phoneNumber) &&
      Personnummer.valid(ssn) &&
      validateCountry(country)
    ) {
      dispatch(submitFormSuccess());
      console.log("Success");
    } else {
      validateErrors(ssn, phoneNumber, email, country);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RockerForm</Text>
      <FormInput
        name="ssn"
        placeholder="Social Security Number"
        value={form.ssn}
        error={errors.ssn}
        submitRockerForm={submitRockerForm}
        updateFormInput={updateFormInput}
      />
      <FormInput
        name="phoneNumber"
        placeholder="Phone Number"
        value={form.phoneNumber}
        error={errors.phoneNumber}
        submitRockerForm={submitRockerForm}
        updateFormInput={updateFormInput}
      />
      <FormInput
        name="email"
        placeholder="Email"
        value={form.email}
        error={errors.email}
        submitRockerForm={submitRockerForm}
        updateFormInput={updateFormInput}
      />
      <PickerSelect
        countries={countries}
        value={form.country || ""}
        error={errors.country}
        submitRockerForm={submitRockerForm}
        updateFormInput={updateFormInput}
      />
      <View style={styles.button}>
        <Button
          title={"Submit"}
          color={"#a19196"}
          onPress={() => submitRockerForm()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383e42",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  button: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
    color: "#fff",
  },
});
