"use client";

import { addToast, Button, Card, cn, Divider, Image } from "@heroui/react";
import { useState } from "react";
import { KYCReport } from "../common/data/kycReportData";
import { IdentityCard } from "./kyc-report/IdentityCard";
import { StatusBadge } from "./kyc-report/StatusBadge";
import { CircularProgress } from "../common/components/CircularProgress";
import { VerificationSection } from "./kyc-report/VerifictionSection";
import { ListSection } from "./kyc-report/ListSection";
import { useRouter } from "@/modules/translations/i18n/routing";

interface KYCReportComponentProps {
  report: KYCReport;
  className?: string;
}

export const KYCReportComponent: React.FC<KYCReportComponentProps> = ({
  report,
  className,
}) => {
  const [showFullReport, setShowFullReport] = useState(false);

  const router = useRouter();

  // Flags to control which sections are expanded
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expandedSections, setExpandedSections] = useState({
    identity: true,
    sanctions: false,
    peps: false,
    criminal: report.criminalRecords.status === "con coincidencias",
    news: false,
  });

  const handleSaveReport = () => {
    addToast({
      title: "Informe guardado",
      description: "El informe ha sido guardado correctamente",
    });
  };

  const getColor = () => {
    if (report.riskScore >= 80) return "#10b981"; // Green for good scores
    if (report.riskScore >= 50) return "#f59e0b"; // Yellow for moderate scores
    return "#ef4444"; // Red for low scores
  };

  return (
    <div className={cn("animate-fade-in", className)}>
      {/* Header section */}
      <div className="mb-8 space-y-1">
        <Button
          onPress={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 mb-12 hover:text-black transition-colors group w-fit"
          variant="light"
          startContent={
            <i
              className="icon-[bx--left-arrow-alt] size-4 group-hover:-translate-x-1 transition-transform"
              role="img"
              aria-hidden="true"
            />
          }
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold">{report.personInfo.fullName}</h1>
        <p className="text-gray-500">
          Fecha del reporte: {report.personInfo.reportDate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Identity information */}
        <div className="lg:col-span-1 space-y-6">
          <IdentityCard personInfo={report.personInfo} />

          <Card className="overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onPress={() => setShowFullReport(!showFullReport)}
              >
                Ver reporte completo
              </Button>

              <Button
                variant="solid"
                size="sm"
                className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
                onPress={handleSaveReport}
              >
                <i
                  className="icon-[material-symbols--download] size-4"
                  role="img"
                  aria-hidden="true"
                />
                Guardar
              </Button>
            </div>
          </Card>
        </div>

        {/* Right column - Verification details */}
        <div className="lg:col-span-2 space-y-6">
          <Card shadow="sm" className="p-5">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h2 className="text-lg font-medium">Detalle</h2>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Verificación de identidad:
                  </span>
                  <StatusBadge result={report.identityVerification} />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-center mb-2">
                  <div className="flex items-center justify-center gap-1">
                    <Image
                      src="/brand/logotype.png"
                      alt="Verdata logotipo"
                      classNames={{
                        wrapper: "size-8 2xl:size-[38px]",
                      }}
                    />
                    <span className="text-sm font-medium">Puntuación</span>
                    <i
                      className="icon-[majesticons--alert-circle] text-gray-400"
                      role="img"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    de riesgo por Verdada.
                  </p>
                </div>
                <CircularProgress
                  value={report.riskScore}
                  size={140}
                  strokeWidth={8}
                  color={getColor()}
                  trailColor="#e5e7eb"
                  valueSuffix="%"
                  className="my-2"
                  valueClassName="text-2xl font-bold"
                  animationDelay={300}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Perfil que presenta coincidencias positivas en un{" "}
                  {report.riskScore}%
                </p>
              </div>
            </div>

            <Divider className="my-4" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Verificación en 350 listas de sanciones en el mundo:
                </span>
                <StatusBadge
                  result={report.sanctionsLists.international.overall}
                  size="sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Verificación en listas de riesgo 413 de América Latina:
                </span>
                <StatusBadge
                  result={report.sanctionsLists.national.overall}
                  size="sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Registros criminales:</span>
                <StatusBadge result={report.criminalRecords} size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Identificación de PEPs:</span>
                <StatusBadge result={report.pepsVerification} size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Noticias publicadas en medios de comunicación:
                </span>
                <StatusBadge result={report.newsMedia} size="sm" />
              </div>
            </div>
          </Card>

          {/* Show detailed sections if full report is selected */}
          {showFullReport && (
            <div className="space-y-4 animate-fade-up">
              <VerificationSection
                title="Verificación de identidad"
                result={report.identityVerification}
                defaultOpen={expandedSections.identity}
              >
                <p className="text-sm text-gray-600">
                  La identidad ha sido verificada contra registros oficiales.
                </p>
              </VerificationSection>

              <VerificationSection
                title="Verificación en 350 listas de sanciones en el mundo"
                result={report.sanctionsLists.international.overall}
                defaultOpen={expandedSections.sanctions}
              >
                <div className="space-y-4">
                  {report.sanctionsLists.international.lists.map(
                    (group, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium">
                          {group.organization} ({group.scope})
                        </h3>
                        <ListSection title="" lists={group.lists} />
                      </div>
                    )
                  )}
                </div>
              </VerificationSection>

              <VerificationSection
                title="Verificación en listas de riesgo 413 de América Latina"
                result={report.sanctionsLists.national.overall}
                defaultOpen={expandedSections.sanctions}
              >
                <div className="space-y-4">
                  {report.sanctionsLists.national.lists.map((group, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">
                        {group.countryName} ({group.countryCode})
                      </h3>
                      <ListSection title="" lists={group.lists} />
                    </div>
                  ))}
                </div>
              </VerificationSection>

              <VerificationSection
                title="Registros criminales"
                result={report.criminalRecords}
                defaultOpen={expandedSections.criminal}
              >
                {report.criminalRecords.details && (
                  <p className="text-sm text-gray-600">
                    {report.criminalRecords.details}
                  </p>
                )}
              </VerificationSection>

              <VerificationSection
                title="Identificación de PEPs"
                result={report.pepsVerification}
                defaultOpen={expandedSections.peps}
              >
                <p className="text-sm text-gray-600">
                  Se ha verificado si el individuo es una Persona Expuesta
                  Políticamente.
                </p>
              </VerificationSection>

              <VerificationSection
                title="Noticias publicadas en medios de comunicación"
                result={report.newsMedia}
                defaultOpen={expandedSections.news}
              >
                <p className="text-sm text-gray-600">
                  Se ha realizado una búsqueda en medios de comunicación para
                  identificar menciones relevantes.
                </p>
              </VerificationSection>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
