import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { FileHelpers } from "../utils/fileHelpers";

interface FileUploadZoneProps {
  selectedFile: File | null;
  isDragActive: boolean;
  onFileSelect: (file: File) => void;
  onRemoveFile: () => void;
  setIsDragActive: (active: boolean) => void;
}

export const FileUploadZone = ({
  selectedFile,
  isDragActive,
  onFileSelect,
  onRemoveFile,
  setIsDragActive,
}: FileUploadZoneProps) => {
  const dragHandlers = useDragAndDrop(onFileSelect, setIsDragActive);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Upload Data File</h2>
          <p className="text-sm text-default-500">
            Drag and drop your file or click to browse
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : selectedFile
              ? "border-green-400 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          {...dragHandlers}
        >
          {selectedFile ? (
            <FileSelected file={selectedFile} onRemove={onRemoveFile} />
          ) : (
            <FileUploadPrompt onFileChange={handleFileInputChange} />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const FileSelected = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => (
  <div className="space-y-4">
    <i
      className="icon-[material-symbols--check-circle-outline-rounded] size-12 text-green-500 mx-auto"
      role="img"
      aria-hidden="true"
    />
    <div>
      <p className="font-medium text-green-800">{file.name}</p>
      <p className="text-sm text-green-600">
        {FileHelpers.formatFileSize(file.size)}
      </p>
    </div>
    <Button
      onPress={onRemove}
      variant="bordered"
      size="sm"
      className="text-red-600 border-red-300 hover:bg-red-50"
      startContent={
        <i className="icon-[tabler--x] size-4" role="img" aria-hidden="true" />
      }
    >
      Remove File
    </Button>
  </div>
);

const FileUploadPrompt = ({
  onFileChange,
}: {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-4">
    <i
      className="icon-[material-symbols--upload] size-12 text-gray-400 mx-auto"
      role="img"
      aria-hidden="true"
    />
    <div>
      <p className="text-lg font-medium text-gray-700">
        Drop your file here, or{" "}
        <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
          browse
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls,.csv"
            onChange={onFileChange}
          />
        </label>
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supports Excel and CSV files up to 10MB
      </p>
    </div>
  </div>
);
