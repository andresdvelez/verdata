export interface VerificationResult {
  status: "sin coincidencias" | "con coincidencias";
  details?: string;
  matches?: number;
}

export interface PersonInfo {
  fullName: string;
  ageRange: string;
  documentNumber: string;
  nationality: string;
  documentStatus: string;
  documentType: string;
  reportDate: string;
}

export interface ListCheck {
  listName: string;
  description: string;
  result: VerificationResult;
}

export interface NationalList {
  countryCode: string;
  countryName: string;
  lists: ListCheck[];
}

export interface InternationalList {
  organization: string;
  scope: string;
  lists: ListCheck[];
}

export interface KYCReport {
  personInfo: PersonInfo;
  identityVerification: VerificationResult;
  riskScore: number;
  sanctionsLists: {
    international: {
      overall: VerificationResult;
      lists: InternationalList[];
    };
    national: {
      overall: VerificationResult;
      lists: NationalList[];
    };
  };
  pepsVerification: VerificationResult;
  criminalRecords: VerificationResult;
  newsMedia: VerificationResult;
}

// Mock data for development purposes
export const sampleKYCReport: KYCReport = {
  personInfo: {
    fullName: "Felipe Vargas",
    ageRange: "No disponible",
    documentNumber: "1015555510",
    nationality: "Colombia",
    documentStatus: "Vigente",
    documentType: "CC",
    reportDate: "11/11/25",
  },
  identityVerification: {
    status: "con coincidencias",
  },
  riskScore: 99,
  sanctionsLists: {
    international: {
      overall: {
        status: "sin coincidencias",
      },
      lists: [
        {
          organization: "Naciones Unidas",
          scope: "Global",
          lists: [
            {
              listName: "Lista Consolidada del Consejo de Seguridad",
              description: "Incluye personas y entidades sujetas a sanciones",
              result: { status: "sin coincidencias" },
            },
            {
              listName: "Lista de terroristas de la ONU",
              description: "Individuos asociados con terrorismo",
              result: { status: "sin coincidencias" },
            },
          ],
        },
        {
          organization: "Unión Europea",
          scope: "Europa",
          lists: [
            {
              listName: "Lista de Sanciones Financieras de la UE",
              description: "Sanciones económicas y financieras",
              result: { status: "sin coincidencias" },
            },
          ],
        },
        {
          organization: "OFAC",
          scope: "Estados Unidos",
          lists: [
            {
              listName: "Lista SDN",
              description: "Specially Designated Nationals",
              result: { status: "sin coincidencias" },
            },
            {
              listName: "Lista Sectorial",
              description: "Entidades en sectores específicos",
              result: { status: "sin coincidencias" },
            },
          ],
        },
      ],
    },
    national: {
      overall: {
        status: "sin coincidencias",
      },
      lists: [
        {
          countryCode: "CO",
          countryName: "Colombia",
          lists: [
            {
              listName: "Lista de la Contraloría",
              description: "Responsabilidad fiscal",
              result: { status: "sin coincidencias" },
            },
            {
              listName: "Lista de la Procuraduría",
              description: "Sanciones disciplinarias",
              result: { status: "sin coincidencias" },
            },
            {
              listName: "Lista DIAN",
              description: "Deudores morosos",
              result: { status: "sin coincidencias" },
            },
          ],
        },
        {
          countryCode: "MX",
          countryName: "México",
          lists: [
            {
              listName: "Lista de la UIF",
              description: "Personas bloqueadas",
              result: { status: "sin coincidencias" },
            },
          ],
        },
        {
          countryCode: "AR",
          countryName: "Argentina",
          lists: [
            {
              listName: "Lista UIF Argentina",
              description: "Personas reportadas",
              result: { status: "sin coincidencias" },
            },
          ],
        },
      ],
    },
  },
  pepsVerification: {
    status: "sin coincidencias",
  },
  criminalRecords: {
    status: "con coincidencias",
    details: "Se encontraron registros en la base de datos criminal nacional",
  },
  newsMedia: {
    status: "sin coincidencias",
  },
};
