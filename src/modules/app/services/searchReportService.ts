import { axiosInstance } from "@/modules/core/lib/axios";

export const searchReportService = async ({
  searchType,
  nationality,
  searchInput,
  token,
}: {
  searchType: string;
  nationality: string;
  searchInput: string;
  token: string;
}) => {
  try {
    const { data: searchReport } = await axiosInstance.post(
      "/reports",
      {
        searchType,
        countryCode: nationality,
        documentNumber: searchInput,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return searchReport;
  } catch (error) {
    return { error };
  }
};
