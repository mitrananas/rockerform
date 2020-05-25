export const validateEmail = (email: string) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validateCountry = (country: string) => {
  if (country === "" || country === "Select an item..." || country === null) {
    return false;
  }

  return true;
};
