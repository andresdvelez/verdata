import { Image } from "@heroui/react";
import { useState } from "react";

export const ScreenshotGallery = ({
  screenshots,
}: {
  screenshots: string[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (screenshots.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Capturas de pantalla</h4>
      <div className="border rounded-md p-2 bg-gray-50">
        <div className="flex justify-center mb-2 overflow-y-scroll max-h-96">
          <Image
            src={screenshots[activeIndex]}
            alt={`Screenshot ${activeIndex + 1}`}
            className="max-w-full object-contain rounded-md"
          />
        </div>

        {screenshots.length > 1 && (
          <div className="flex gap-2 overflow-x-auto py-2">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`border-2 rounded-md overflow-hidden flex-shrink-0 ${
                  index === activeIndex ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={screenshot}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-12 w-16 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
