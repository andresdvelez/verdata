import { axiosInstance } from "@/modules/core/lib/axios";
import { BulkSearchRequest, BulkSearchResponse } from "@/types/app/bulk-search";

export class BulkSearchService {
  private static readonly ENDPOINTS = {
    BULK_PROCESS: "/reports/bulk-process",
  } as const;

  /**
   * Process bulk reports and return downloadable file
   */
  static async processBulkReports(
    data: BulkSearchRequest,
    token: string
  ): Promise<BulkSearchResponse> {
    try {
      const formData = new FormData();
      formData.append("file", data.file);

      if (data.country) {
        formData.append("country", data.country);
      }

      const response = await axiosInstance.post(
        this.ENDPOINTS.BULK_PROCESS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      const filename =
        this.extractFilename(contentDisposition) || "bulk-search-results.xlsx";

      return {
        blob: response.data,
        filename,
        success: true,
      };
    } catch (error) {
      console.error("Bulk search processing failed:", error);
      throw new Error("Failed to process bulk search. Please try again.");
    }
  }

  /**
   * Extract filename from Content-Disposition header
   */
  private static extractFilename(contentDisposition?: string): string | null {
    if (!contentDisposition) return null;

    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
      contentDisposition
    );
    if (matches && matches[1]) {
      return matches[1].replace(/['"]/g, "");
    }
    return null;
  }
}
