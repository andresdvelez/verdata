import { cn } from "@heroui/react";

interface PlanCardProps {
  title: string;
  consultations: string;
  price: string;
  buttonText: string;
  colorScheme: "white" | "purple" | "yellow" | "black";
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  consultations,
  price,
  buttonText,
  colorScheme,
}) => {
  const bgColors = {
    white: "bg-white",
    purple: "bg-[#9b87f5]",
    yellow: "bg-[#F2FCE2]",
    black: "bg-black",
  };

  const textColors = {
    white: "text-black",
    purple: "text-white",
    yellow: "text-black",
    black: "text-white",
  };

  const borderColors = {
    white: "border-[#8E9196]",
    purple: "border-[#9b87f5]",
    yellow: "border-[#C8C8C9]",
    black: "border-black",
  };

  return (
    <div
      className={cn(
        "w-[240px] h-[280px] flex flex-col justify-between p-6 border",
        bgColors[colorScheme],
        textColors[colorScheme],
        borderColors[colorScheme]
      )}
    >
      <div>
        <h3 className="text-lg font-medium mb-4">{title}</h3>

        <div className="mb-2">
          <span className="text-5xl font-bold">
            {consultations.split(" ")[0]}
          </span>
          <span className="text-2xl font-bold">*</span>
        </div>

        <p className="text-sm mb-6">Consultas mensuales</p>

        <div className="mb-6">
          {price !== "N/A" ? (
            <>
              <span className="text-xl font-bold mr-1">
                {price.split(" ")[0]}
              </span>
              <span className="text-sm">{price.split(" ")[1]}</span>
            </>
          ) : (
            <span className="text-xl font-bold">N/A</span>
          )}
        </div>
      </div>

      <button
        className={cn(
          "py-2 text-sm font-medium",
          colorScheme === "black"
            ? "text-white"
            : colorScheme === "purple"
            ? "text-white hover:text-[#9b87f5]"
            : "text-black hover:text-gray-700",
          colorScheme === "purple"
            ? "hover:bg-white"
            : colorScheme === "black"
            ? "hover:bg-gray-800"
            : "hover:bg-gray-100",
          "transition-colors duration-200"
        )}
      >
        {buttonText}
      </button>
    </div>
  );
};
