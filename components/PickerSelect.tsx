import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface Country {
  label: string;
  value: string;
}

interface Props {
  value: string;
  countries: Country[];
  error: string;
  validateError(value: string): void;
  updateFormInput(fieldName: string, fieldValue: string): void;
}

export default function PickerSelect({
  countries,
  value,
  error,
  validateError,
  updateFormInput,
}: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.pickerWrapper,
          error ? styles.inputInvalid : styles.inputValid,
        ]}
      >
        <RNPickerSelect
          items={countries}
          onValueChange={(value) => {
            validateError(value);
            updateFormInput("country", value);
          }}
          value={value}
        />
      </View>
      <View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pickerWrapper: {
    height: 40,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputValid: {
    borderColor: "gray",
  },
  inputInvalid: {
    borderColor: "red",
  },
  errorText: {
    color: "#fff",
  },
});
