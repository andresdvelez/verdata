import { ListCheck } from "../../common/data/kycReportData";
import { StatusBadge } from "./StatusBadge";

interface ListSectionProps {
  title: string;
  lists: ListCheck[];
  className?: string;
}

export const ListSection: React.FC<ListSectionProps> = ({
  title,
  lists,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {lists.map((list, index) => (
          <div
            key={index}
            className="bg-white border rounded-md p-3 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{list.listName}</h4>
                <p className="text-xs text-gray-500 mt-1">{list.description}</p>
              </div>
              <StatusBadge result={list.result} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
