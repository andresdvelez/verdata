import axios from "axios";

export const listNames = async ({
  countryCode,
  searchName,
}: {
  countryCode: string;
  searchName: string;
}) => {
  try {
    const response = await axios.get(
      `/list_names/${countryCode}/${searchName}/`
    );
    return response.data;
  } catch (error) {
    // TODO: Handle errors in requests
    console.log(error);
  }
};
