export interface BulkSearchRequest {
  file: File;
  country?: string;
}

export interface BulkSearchResponse {
  blob: Blob;
  filename: string;
  success: boolean;
}

export interface Country {
  code: string;
  name: string;
}

export interface BulkSearchState {
  selectedFile: File | null;
  selectedCountry: string;
  isDragActive: boolean;
  isProcessing: boolean;
}
