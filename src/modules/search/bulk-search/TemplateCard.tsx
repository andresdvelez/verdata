import { Card, CardBody, CardHeader, Button } from "@heroui/react";

interface TemplateCardProps {
  onDownloadTemplate: () => void;
}

export const TemplateCard = ({ onDownloadTemplate }: TemplateCardProps) => {
  return (
    <Card className="border-blue-200 bg-blue-50/70 p-3 h-max">
      <CardHeader>
        <div className="flex flex-col">
          <h2 className="flex items-center gap-2 text-blue-800 text-lg font-semibold">
            <i
              className="icon-[icon-park-outline--excel] size-5"
              role="img"
              aria-hidden="true"
            />
            File Template
          </h2>
          <p className="text-sm text-blue-700">
            Download the template to format your data correctly
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex-1">
            <h4 className="font-medium mb-2">Required Columns:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>name:</strong> Full name of the person
              </li>
              <li>
                • <strong>document_number:</strong> Government ID or passport
                number
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: .xlsx, .xls, .csv
            </p>
          </div>
          <Button
            onPress={onDownloadTemplate}
            variant="bordered"
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
            startContent={
              <i
                className="icon-[material-symbols--download] size-5"
                role="img"
                aria-hidden="true"
              />
            }
          >
            Download Template
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
