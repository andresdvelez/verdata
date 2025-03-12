type Countries = "BRL";

export const parseCountry = (countryToParse: string) => {
  const countries: Record<Countries, string> = {
    BRL: "BRA",
  };
  return countries[countryToParse as keyof typeof countries] || countryToParse;
};
