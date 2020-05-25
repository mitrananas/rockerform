import React, { useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FormInput from "../components/FormInput";
import PickerSelect from "../components/PickerSelect";
import { BACKGROUND_COLOR, TITLE_COLOR } from "../constants";
import {
  validateCountry,
  validateEmail,
  validatePhoneNumber,
  validateSSN,
  validateAll,
} from "../helpers/validate";
import { addCountries, submitFormSuccess, updateField } from "../actions";

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

  const submitRockerForm = () => {
    const { ssn, phoneNumber, email, country } = form;

    if (validateAll(dispatch, ssn, phoneNumber, email, country)) {
      dispatch(submitFormSuccess());
      console.log("Success");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>RockerForm</Text>
        <FormInput
          name="ssn"
          placeholder="Social Security Number"
          value={form.ssn}
          error={errors.ssn}
          validateError={validateSSN}
          submitRockerForm={submitRockerForm}
          updateFormInput={updateFormInput}
        />
        <FormInput
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          error={errors.phoneNumber}
          validateError={validatePhoneNumber}
          submitRockerForm={submitRockerForm}
          updateFormInput={updateFormInput}
        />
        <FormInput
          name="email"
          placeholder="Email"
          value={form.email}
          error={errors.email}
          validateError={validateEmail}
          submitRockerForm={submitRockerForm}
          updateFormInput={updateFormInput}
        />
        <PickerSelect
          countries={countries}
          value={form.country}
          error={errors.country}
          validateError={validateCountry}
          updateFormInput={updateFormInput}
        />
        <View style={styles.button}>
          <Button
            title={"Submit"}
            color={Platform.OS === "ios" ? "#fff" : "#a19196"}
            onPress={() => submitRockerForm()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  button: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
    color: TITLE_COLOR,
  },
});
