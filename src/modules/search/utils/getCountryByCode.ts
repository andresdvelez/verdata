import { COUNTRIES } from "@/modules/app/data/countries";

export const getCountryName = (countryCode: string) => {
  return COUNTRIES.find((country) => country.Country_Code === countryCode)
    ?.Country;
};
