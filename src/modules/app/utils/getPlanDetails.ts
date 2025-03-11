import { Plan } from "@/types/app/schematic";

export const getPlanDetails = (
  plan: Plan
): {
  title: string;
  consultations: string;
  colorScheme: "white" | "purple" | "yellow" | "black";
} => {
  const title = plan.name;

  let consultations = "0";

  let colorScheme: "white" | "purple" | "yellow" | "black";

  if (plan.name.includes("Emprendedor")) {
    colorScheme = "white";
  } else if (plan.name.includes("Crecimiento")) {
    colorScheme = "white";
  } else if (plan.name.includes("Profesional")) {
    colorScheme = "yellow";
  } else {
    colorScheme = "white";
  }

  if (plan.description) {
    const match = plan.description.match(/(\d+)\s+(?:búsquedas|consultas)/i);
    if (match && match[1]) {
      // If a number of consultations is found in the description, use it
      consultations = match[1];
      // Add "+" if it's 1000 or more
      if (parseInt(consultations) >= 1000) {
        consultations = "+" + consultations;
      }
    }
  }

  return { title, consultations, colorScheme };
};
