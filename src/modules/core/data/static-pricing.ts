import { StaticPlan } from "@/modules/app/home/Plans";

export const STATIC_PLANS: (t: (key: string) => string) => StaticPlan[] = (
  t
) => [
  {
    id: 1,
    tier: t("basic"),
    consultations: "100*",
    consultationsText: t("monthly-consults"),
    price: "$500",
    priceDetail: ".000/m*",
    backgroundColor: "white",
    textColor: "black",
    buttonText: t("subscribe-now"),
    buttonLink: "#basic-subscription",
  },
  {
    id: 2,
    tier: t("medium"),
    consultations: "500*",
    consultationsText: t("monthly-consults"),
    price: "$2",
    priceDetail: "millones/m*",
    backgroundColor: "#8A70D6",
    textColor: "white",
    buttonText: t("subscribe-now"),
    buttonLink: "#medium-subscription",
  },
  {
    id: 3,
    tier: "Pro",
    consultations: "1000*",
    consultationsText: t("monthly-consults"),
    price: "$3",
    priceDetail: "millones/m*",
    backgroundColor: "#E8F056",
    textColor: "black",
    buttonText: t("subscribe-now"),
    buttonLink: "#pro-subscription",
  },
  {
    id: 4,
    tier: t("business"),
    consultations: "+1000*",
    consultationsText: t("monthly-consults"),
    price: "N/A",
    priceDetail: "",
    backgroundColor: "black",
    textColor: "white",
    buttonText: t("contact-commercial"),
    buttonLink: "#enterprise-contact",
  },
];
