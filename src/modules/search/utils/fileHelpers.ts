export class FileHelpers {
  private static readonly VALID_FILE_TYPES = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
  ] as const;

  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  /**
   * Validate file type and size
   */
  static validateFile(file: File): { isValid: boolean; error?: string } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!this.VALID_FILE_TYPES.includes(file.type as any)) {
      return {
        isValid: false,
        error: "Please upload an Excel (.xlsx) or CSV file.",
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: "File size must be less than 10MB.",
      };
    }

    return { isValid: true };
  }

  /**
   * Format file size in human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Download file from blob
   */
  static downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Generate and download CSV template
   */
  static downloadTemplate(): void {
    const csvContent = [
      "name,document_number",
      "John Doe,123456789",
      "Jane Smith,987654321",
      "Bob Johnson,456789123",
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    this.downloadFile(blob, "kyc_bulk_search_template.csv");
  }
}
