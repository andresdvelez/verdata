import { useRef, useState } from "react";
import { RestrictiveListResult } from "@/types/app/reports";
import { FileDownload } from "./FileDownload";
import { ListItem } from "./ListItem";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@heroui/react";

export const RestrictiveList = ({
  listData,
}: {
  listData: RestrictiveListResult;
}) => {
  const { listName, isMatch, items, error, file, screenshots } = listData;
  const [visibleCount, setVisibleCount] = useState(5);

  // ref for the list header
  const headerRef = useRef<HTMLDivElement>(null);

  const handleViewMore = () => setVisibleCount((prev) => prev + 5);
  const handleGoTop = () => {
    headerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const allVisible = visibleCount >= items.length;
  const showGoTop = visibleCount >= 10;

  return (
    <div className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
      <div
        ref={headerRef}
        className="w-full flex items-center justify-between mb-2"
      >
        <h3 className="font-medium">{listName}</h3>
        <StatusBadge isMatch={isMatch} size="sm" />
      </div>

      {error ? (
        <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
          <div className="flex items-center gap-2">
            <svg
              className="text-yellow-600 w-5 h-5 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.29 3.86L1.82 18C1.64 18.32 1.55 18.68 1.56 19.04C1.57 19.41 1.66 19.76 1.84 20.07C2.02 20.38 2.27 20.65 2.58 20.84C2.89 21.03 3.24 21.14 3.6 21.15H20.52C20.88 21.15 21.23 21.04 21.54 20.85C21.85 20.66 22.1 20.4 22.28 20.08C22.46 19.77 22.56 19.42 22.57 19.05C22.58 18.69 22.5 18.34 22.32 18.01L13.84 3.86C13.66 3.55 13.41 3.28 13.11 3.1C12.81 2.91 12.46 2.82 12.11 2.82C11.76 2.83 11.41 2.93 11.11 3.11C10.81 3.3 10.56 3.56 10.38 3.88"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 9V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-yellow-800">{error}</p>
          </div>
        </div>
      ) : (
        <>
          {file && <FileDownload fileUrl={file} />}

          {items.length > 0 ? (
            <>
              <div className="space-y-2">
                {items.slice(0, visibleCount).map((item, idx) => (
                  <ListItem key={idx} item={item} />
                ))}
              </div>

              <div className="mt-2 text-center space-x-2">
                {!allVisible && (
                  <Button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onPress={handleViewMore}
                  >
                    View More
                  </Button>
                )}
                {showGoTop && (
                  <Button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onPress={handleGoTop}
                  >
                    Go to Top
                  </Button>
                )}
              </div>
            </>
          ) : isMatch && !file ? (
            <p className="text-sm text-gray-600 italic">
              Existe una coincidencia, pero no hay detalles disponibles.
            </p>
          ) : null}

          {screenshots.length > 0 && (
            <ScreenshotGallery screenshots={screenshots} />
          )}
        </>
      )}
    </div>
  );
};
