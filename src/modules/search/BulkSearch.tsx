import { Button } from "@heroui/react";
import { useBulkSearch } from "./hooks/useBulkSearch";
import { CountrySelector } from "./bulk-search/CountrySelector";
import { FileUploadZone } from "./bulk-search/FileUploadZone";
import { TemplateCard } from "./bulk-search/TemplateCard";
import { Country } from "@/types/app/bulk-search";
import { ProcessingNotice } from "./bulk-search/ProcessingNotice";

// Mock countries data - replace with your actual countries
const countries: Country[] = [
  { code: "COL", name: "Colombia" },
  { code: "USA", name: "United States" },
  { code: "MEX", name: "Mexico" },
];

export const BulkSearch = () => {
  const { state, actions } = useBulkSearch();

  const { selectedFile, selectedCountry, isDragActive, isProcessing } = state;

  const {
    handleFileSelection,
    removeFile,
    setSelectedCountry,
    setIsDragActive,
    processBulkSearch,
    downloadTemplate,
  } = actions;

  const canSubmit = selectedFile && selectedCountry && !isProcessing;
  const showProcessingNotice = selectedFile && selectedCountry ? true : false;

  return (
    <div className="flex gap-6 w-full">
      <div className="space-y-6 w-full">
        {/* Country Selection */}
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          countries={countries}
        />

        {/* File Upload Section */}
        <FileUploadZone
          selectedFile={selectedFile}
          isDragActive={isDragActive}
          onFileSelect={handleFileSelection}
          onRemoveFile={removeFile}
          setIsDragActive={setIsDragActive}
        />

        {/* Processing Notice */}
        <ProcessingNotice show={showProcessingNotice} />

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            onPress={processBulkSearch}
            isDisabled={!canSubmit}
            className="px-8 py-3 text-lg font-medium"
            color="primary"
            size="md"
            isLoading={isProcessing}
            startContent={
              !isProcessing && (
                <i
                  className="icon-[material-symbols--upload] size-5"
                  role="img"
                  aria-hidden="true"
                />
              )
            }
          >
            {isProcessing ? "Processing..." : "Start Bulk Search"}
          </Button>
        </div>
      </div>

      {/* Template Download Section */}
      <TemplateCard onDownloadTemplate={downloadTemplate} />
    </div>
  );
};
