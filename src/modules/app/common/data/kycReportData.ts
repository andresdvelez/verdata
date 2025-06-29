import { KYCReport } from "@/types/app/reports";

export const sampleKYCReport: KYCReport = {
  id: "cm937kfn20002stz55t7yced4",
  user_id: "cm8wa44et0000jp03pcclw5yb",
  related_identity_id: "cm937kfbr0000stz5aconbidq",
  is_identity_matched: true,
  risk_score: 59,
  related_identity: {
    id: "cm937kfbr0000stz5aconbidq",
    name: "JUAN HERNANDO ARANZAZU",
    document: "1234567",
    document_type: "C.C",
    nationality: "Colombia",
    created_at: new Date("2025-03-31T12:45:30.123Z"),
  },
  sanctions_lists: {
    international: {
      overall: false,
      lists: [
        {
          listCode: "UNSC_CONS",
          listName: "Lista Consolidada del Consejo de Seguridad",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "UN_TERROR",
          listName: "Lista de terroristas de la ONU",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "EU_FIN",
          listName: "Lista de Sanciones Financieras de la UE",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "OFAC_SDN",
          listName: "Lista SDN",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "OFAC_SECTOR",
          listName: "Lista Sectorial",
          isMatch: false,
          items: [],
          screenshots: [],
        },
      ],
    },
    national: {
      overall: false,
      lists: [
        {
          listCode: "CO_CTR",
          listName: "Lista de la Contraloría",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "CO_PRC",
          listName: "Lista de la Procuraduría",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "CO_DIAN",
          listName: "Lista DIAN",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "MX_UIF",
          listName: "Lista de la UIF",
          isMatch: false,
          items: [],
          screenshots: [],
        },
        {
          listCode: "AR_UIF",
          listName: "Lista UIF Argentina",
          isMatch: false,
          items: [],
          screenshots: [],
        },
      ],
    },
  },
  peps_lists: {
    lists: [
      {
        items: [],
        isMatch: false,
        listCode: "PEPS",
        listName: "Politically Exposed Persons (PEPs)",
        screenshots: [],
      },
    ],
    overall: false,
  },
  peps_verification: false,
  criminal_records: true,
  news_media: true,
  nationality: "Colombia",
  search_data: "1015555510",
  search_type: "CC",
  created_at: new Date("2025-04-26"),
  isRealData: false,
};
