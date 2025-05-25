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
    // Ensure token is properly formatted
    const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    // Create the payload
    const payload = {
      searchType,
      countryCode: nationality,
      resolvedName: "",
      identityData: searchInput,
    };

    console.log("🚀 Sending request to backend:", {
      payload,
      baseURL: axiosInstance.defaults.baseURL,
    });

    const { data: searchReport } = await axiosInstance.post(
      "/reports",
      payload,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    console.log("✅ Backend response received:", searchReport);
    return searchReport;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Error in searchReportService:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers,
        data: error.config?.data,
      },
    });

    // Re-throw the error to maintain the same behavior
    throw error;
  }
};
