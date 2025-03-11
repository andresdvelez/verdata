export const formatPrice = (priceObj: { price: number; currency: string }) => {
  console.log(priceObj);
  if (!priceObj || !priceObj.price) return "N/A";

  // Convert from cents to whole units
  const price = priceObj.price / 100;

  // Format based on currency
  const currency = priceObj.currency.toUpperCase();

  // Format with proper currency symbol
  let symbol = "$";
  if (currency === "EUR") symbol = "€";

  return `${symbol}${price} ${currency}`;
};
