import { KYCReport } from "@/types/app/reports";

export const sampleKYCReport: KYCReport = {
  id: "1",
  user_id: "1",
  related_identity_id: "123",
  is_identity_matched: true,
  risk_score: 59,
  related_identity: {
    id: "1",
    name: "Felipe Vargas",
    document: "1102003346",
    document_type: "C.C",
    nationality: "Colombia",
    created_at: new Date("2025-03-31T12:45:30.123Z"),
  },
  sanctions_lists: {
    international: {
      overall: false,
      lists: [
        {
          organization: "Naciones Unidas",
          scope: "Global",
          lists: [
            {
              listName: "Lista Consolidada del Consejo de Seguridad",
              description: "Incluye personas y entidades sujetas a sanciones",
              result: false,
            },
            {
              listName: "Lista de terroristas de la ONU",
              description: "Individuos asociados con terrorismo",
              result: false,
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
              result: false,
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
              result: false,
            },
            {
              listName: "Lista Sectorial",
              description: "Entidades en sectores específicos",
              result: false,
            },
          ],
        },
      ],
    },
    national: {
      overall: false,
      lists: [
        {
          countryCode: "CO",
          countryName: "Colombia",
          lists: [
            {
              listName: "Lista de la Contraloría",
              description: "Responsabilidad fiscal",
              result: false,
            },
            {
              listName: "Lista de la Procuraduría",
              description: "Sanciones disciplinarias",
              result: false,
            },
            {
              listName: "Lista DIAN",
              description: "Deudores morosos",
              result: false,
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
              result: false,
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
              result: false,
            },
          ],
        },
      ],
    },
  },
  peps_verification: false,
  criminal_records: true,
  news_media: true,
  nationality: "Colombia",
  search_data: "1015555510",
  search_type: "CC",
  created_at: new Date("2025-04-26"),
};
