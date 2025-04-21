export interface SearchFormInterface {
  nationality: string;
  searchType: string;
  searchInput: string;
}

export enum SearchType {
  NAME = "name",
  DOCUMENT = "document",
}
