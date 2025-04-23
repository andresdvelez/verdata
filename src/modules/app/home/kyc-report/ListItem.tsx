import { RestrictiveListItem } from "@/types/app/reports";
import { Image } from "@heroui/react";

export const ListItem = ({ item }: { item: RestrictiveListItem }) => {
  return (
    <div className="border rounded-md p-3 mb-3 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-3">
        {item.imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="h-24 w-24 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex-grow">
          <h4 className="font-semibold text-base">{item.title}</h4>
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          )}
          {item.url && (
            <a
              href={item.url}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
            >
              Ver fuente
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
