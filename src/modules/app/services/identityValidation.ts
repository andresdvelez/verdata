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

export const getIdentityByName = async ({
  country,
  name,
}: {
  country: string;
  name: string;
}) => {
  try {
    const response = await axiosInstance.get(
      `identity_validation/${country}/query_by_name/${name}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
