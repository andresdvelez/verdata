import { useState, useCallback } from "react";
import { addToast } from "@heroui/react";
import { BulkSearchState } from "@/types/app/bulk-search";
import { FileHelpers } from "../utils/fileHelpers";
import { BulkSearchService } from "@/modules/app/services/bulkSearchService";
import { useSearchReportStore } from "@/modules/store/search-report-store";

export const useBulkSearch = () => {
  const [state, setState] = useState<BulkSearchState>({
    selectedFile: null,
    selectedCountry: "",
    isDragActive: false,
    isProcessing: false,
  });

  const token = useSearchReportStore((s) => s.token);

  const updateState = useCallback((updates: Partial<BulkSearchState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleFileSelection = useCallback(
    (file: File) => {
      if (!file) return;

      const validation = FileHelpers.validateFile(file);

      if (!validation.isValid) {
        addToast({
          title: "Invalid File",
          description: validation.error,
          color: "warning",
        });
        return;
      }

      updateState({ selectedFile: file });

      addToast({
        title: "File Selected",
        description: `${file.name} (${FileHelpers.formatFileSize(
          file.size
        )}) ready for processing.`,
        color: "success",
      });
    },
    [updateState]
  );

  const removeFile = useCallback(() => {
    updateState({ selectedFile: null });
  }, [updateState]);

  const setSelectedCountry = useCallback(
    (country: string) => {
      updateState({ selectedCountry: country });
    },
    [updateState]
  );

  const setIsDragActive = useCallback(
    (isDragActive: boolean) => {
      updateState({ isDragActive });
    },
    [updateState]
  );

  const processBulkSearch = useCallback(async () => {
    if (!state.selectedFile || !state.selectedCountry) {
      addToast({
        title: "Missing Information",
        description: "Please select a file and country before proceeding.",
        color: "warning",
      });
      return;
    }

    updateState({ isProcessing: true });

    try {
      const response = await BulkSearchService.processBulkReports(
        {
          file: state.selectedFile,
          country: state.selectedCountry,
        },
        token
      );

      // Download the results file
      FileHelpers.downloadFile(response.blob, response.filename);

      addToast({
        title: "Bulk Search Completed",
        description: `Results downloaded as ${response.filename}`,
        color: "success",
      });

      // Reset form
      updateState({
        selectedFile: null,
        selectedCountry: "",
      });
    } catch (error) {
      addToast({
        title: "Processing Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        color: "danger",
      });
    } finally {
      updateState({ isProcessing: false });
    }
  }, [state.selectedFile, state.selectedCountry, updateState, token]);

  const downloadTemplate = useCallback(() => {
    FileHelpers.downloadTemplate();

    addToast({
      title: "Template Downloaded",
      description: "Use this template to format your bulk search data.",
      color: "primary",
    });
  }, []);

  return {
    state,
    actions: {
      handleFileSelection,
      removeFile,
      setSelectedCountry,
      setIsDragActive,
      processBulkSearch,
      downloadTemplate,
    },
  };
};
