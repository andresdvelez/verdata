export type DataResponse = {
  NAME: string;
  DATA: string;
};

export interface FetchData {
  name: string;
  data: Array<DataResponse> | DataResponse;
  coincidenceByName: boolean;
  coincidenceById: boolean;
}
