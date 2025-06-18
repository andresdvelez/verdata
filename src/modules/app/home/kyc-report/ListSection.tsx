import { RestrictiveListResult } from "@/types/app/reports";
import { StatusBadge } from "./StatusBadge";

interface ListSectionProps {
  title: string;
  lists: RestrictiveListResult[];
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
              </div>
              <StatusBadge isMatch={list.isMatch} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
