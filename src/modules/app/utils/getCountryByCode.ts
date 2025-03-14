import { COUNTRIES } from "../data/countries";
import { parseCountry } from "./parseCountry";

export const getCountryByCode = (countryCode: string) => {
  return COUNTRIES.find(
    (country) => country.Country_Code === parseCountry(countryCode)
  );
};
