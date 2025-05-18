import { CheckFlagResponse } from "@schematichq/schematic-typescript-node/api";
import { SignJWT } from "jose";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET!;

const secretKeyUint8 = new TextEncoder().encode(SECRET_KEY);

type GenerateAuthTokenType = {
  id: string;
  monthly_requests: CheckFlagResponse;
  national_lists_search: CheckFlagResponse;
  international_lists_search: CheckFlagResponse;
};

export const generateToken = async (dataToEncode: GenerateAuthTokenType) => {
  const token = await new SignJWT(dataToEncode)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1yr")
    .sign(secretKeyUint8);
  return token;
};
