import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Platform, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
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

interface Country {
  label: string;
  value: string;
}

interface Props {
  value: string;
  countries: Country[];
  error: string;
  validateError(dispatch: Function, value: string): void;
  updateFormInput(fieldName: string, fieldValue: string): void;
}

export default function PickerSelect({
  countries,
  value,
  error,
  validateError,
  updateFormInput,
}: Props) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.pickerWrapper,
          error ? styles.inputInvalid : styles.inputValid,
          Platform.OS === "ios" ? styles.inputIOS : null,
        ]}
      >
        <RNPickerSelect
          items={countries}
          onValueChange={(value) => {
            validateError(dispatch, value);
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
    height: INPUT_HEIGHT,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    backgroundColor: INPUT_BACKGROUND_COLOR,
  },
  inputIOS: {
    padding: INPUT_PADDING,
    fontSize: INPUT_FONTSIZE,
  },
  inputValid: {
    borderColor: BORDER_COLOR,
  },
  inputInvalid: {
    borderColor: BORDER_COLOR_INVALID_INPUT,
  },
  errorText: {
    color: INPUT_ERROR_TEXT,
  },
});
