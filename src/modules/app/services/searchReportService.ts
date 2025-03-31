import axios from "axios";

export const searchReportService = async ({
  searchType,
  nationality,
  searchInput,
}: {
  searchType: string;
  nationality: string;
  searchInput: string;
}) => {
  try {
    const searchReport = await axios.post("", {
      searchType,
      nationality,
      searchInput,
    });
    return searchReport;
  } catch (error) {
    return { error };
  }
};
