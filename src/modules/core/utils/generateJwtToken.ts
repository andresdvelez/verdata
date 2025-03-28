import { SignJWT } from "jose";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET!;

const secretKeyUint8 = new TextEncoder().encode(SECRET_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateToken = async (dataToEncode: any) => {
  const token = await new SignJWT(dataToEncode)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1yr")
    .sign(secretKeyUint8);
  return token;
};
