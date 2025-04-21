import { axiosInstance } from "@/modules/core/lib/axios";

export const getIdentityByDocument = async ({
  nationality,
  identification,
  token,
}: {
  nationality: string;
  identification: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `/searched-identities`,
      {
        document: identification,
        nationality,
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
