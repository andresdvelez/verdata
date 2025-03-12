import axios from "axios";

export const getIdentityByDocument = async ({
  country,
  identification,
}: {
  country: string;
  identification: string;
}) => {
  try {
    const response = await axios.get(
      `identity_validation/${country}/query_by_document/${identification}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
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
    const response = await axios.get(
      `identity_validation/${country}/query_by_name/${name}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
