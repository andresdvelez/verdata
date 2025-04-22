import { axiosInstance } from "@/modules/core/lib/axios";
import { SearchType } from "@/types/app/search";

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
        identityData: identification,
        countryCode: nationality,
        searchType: SearchType.DOCUMENT,
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
