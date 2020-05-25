import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, TextInput } from "react-native";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  INPUT_BACKGROUND_COLOR,
  INPUT_ERROR_TEXT,
  INPUT_FONTSIZE,
  INPUT_HEIGHT,
  INPUT_PADDING,
  BORDER_COLOR,
  BORDER_COLOR_INVALID_INPUT,
} from "../constants";

interface Props {
  value: string;
  placeholder: string;
  name: string;
  error: string;
  submitRockerForm(): void;
  updateFormInput(fieldName: string, fieldValue: string): void;
  validateError(dispatch: Function, value: string): void;
}

export default function FormInput({
  name,
  value,
  placeholder,
  error,
  submitRockerForm,
  updateFormInput,
  validateError,
}: Props) {
  const dispatch = useDispatch();
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
        onBlur={() => validateError(dispatch, value)}
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
    height: INPUT_HEIGHT,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    padding: INPUT_PADDING,
    fontSize: INPUT_FONTSIZE,
    backgroundColor: INPUT_BACKGROUND_COLOR,
  },
  textInputValid: {
    borderColor: BORDER_COLOR,
  },
  textInputInvalid: {
    borderColor: BORDER_COLOR_INVALID_INPUT,
  },
  errorText: {
    color: INPUT_ERROR_TEXT,
  },
});
