import { cn } from "@heroui/react";
import { PersonInfo } from "../../common/data/kycReportData";

interface IdentityCardProps {
  personInfo: PersonInfo;
  className?: string;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({
  personInfo,
  className,
}) => {
  return (
    <div
      className={cn(
        "glass-card py-6 rounded-lg space-y-4 animate-fade-in",
        className
      )}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Verificación de identidad</h2>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Nombre:</p>
          <p className="font-medium">{personInfo.fullName}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Rango de edad:</p>
          <p className="font-medium">{personInfo.ageRange}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Número de documento:</p>
          <p className="font-medium">{personInfo.documentNumber}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Nacionalidad:</p>
          <p className="font-medium">{personInfo.nationality}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Estado del documento:</p>
          <p className="font-medium">{personInfo.documentStatus}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Tipo de documento:</p>
          <p className="font-medium">{personInfo.documentType}</p>
        </div>
      </div>
    </div>
  );
};
