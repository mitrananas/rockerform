import { combineReducers } from "redux";
import {
  ADD_COUNTRIES,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
  UPDATE_FIELD,
} from "./actions";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "./store";

export const formState = {
  form: {
    ssn: "",
    phoneNumber: "",
    email: "",
    country: undefined,
  },
  errors: { ssn: "", phoneNumber: "", email: "", country: "" },
};

let countriesState = { countries: [] };

const formReducer = (state = formState, action: any) => {
  switch (action.type) {
    case SUBMIT_FORM_SUCCESS:
      purgeStoredState(persistConfig);
      return state;
    case SUBMIT_FORM_ERROR:
      const newErrors: any = { ...state.errors };
      newErrors[action.fieldName] = action.error;
      return {
        ...state,
        errors: newErrors,
      };
    case UPDATE_FIELD:
      const newForm: any = { ...state.form };
      newForm[action.fieldName] = action.fieldValue;
      return { ...state, form: newForm };
    default:
      return state;
  }
};

const countriesReducer = (state = countriesState, action: any) => {
  switch (action.type) {
    case ADD_COUNTRIES:
      const newCountries = action.countries.map(
        (item: { name: string; alpha2Code: string }) => {
          return { label: item.name, value: item.alpha2Code };
        }
      );
      return { countries: newCountries };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  formReducer,
  countriesReducer,
});

export default rootReducer;
