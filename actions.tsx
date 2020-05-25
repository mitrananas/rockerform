export const ADD_COUNTRIES = "ADD_COUNTRIES";
export const UPDATE_COUNTRY = "UPDATE_COUNTRY";
export const UPDATE_FIELD = "UPDATE_FIELD";
export const SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS";
export const SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR";

export const addCountries = (countries: Object[]) => ({
  type: ADD_COUNTRIES,
  countries,
});

export const updateField = (fieldName: string, fieldValue: string) => ({
  type: UPDATE_FIELD,
  fieldName,
  fieldValue,
});

export const submitFormSuccess = () => ({
  type: SUBMIT_FORM_SUCCESS,
});

export const submitFormError = (fieldName: string, error: string) => ({
  type: SUBMIT_FORM_ERROR,
  fieldName,
  error,
});
