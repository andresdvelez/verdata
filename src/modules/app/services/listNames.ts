import { axiosInstance } from "@/modules/core/lib/axios";

export const listNames = async ({
  countryCode,
  identityName,
  token,
}: {
  countryCode: string;
  identityName: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `/searched-identities/list-names`,
      {
        countryCode,
        identityName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};
