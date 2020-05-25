import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { submitFormError } from "../actions";

interface Props {
  value: string;
  placeholder: string;
  name: string;
  error: string;
  submitRockerForm(): void;
  updateFormInput(fieldName: string, fieldValue: string): void;
}

export default function FormInput({
  name,
  value,
  placeholder,
  error,
  submitRockerForm,
  updateFormInput,
}: Props) {
  const hasError = error.length > 0;
  return (
    <View style={styles.textInputWrapper}>
      <TextInput
        style={[
          styles.textInputContainer,
          hasError ? styles.textInputInvalid : styles.textInputValid,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => updateFormInput(name, text)}
        onSubmitEditing={() => submitRockerForm()}
      />
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputWrapper: {
    paddingBottom: 15,
    width: "100%",
  },
  textInputContainer: {
    height: 40,
    borderWidth: 2,
    padding: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textInputValid: {
    borderColor: "gray",
  },
  textInputInvalid: {
    borderColor: "red",
  },
  errorText: {
    color: "#fff",
  },
});
