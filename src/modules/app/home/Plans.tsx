import { Plan } from "@/types/app/schematic";
import { getPlanDetails } from "../utils/getPlanDetails";
import { PlanCard } from "./PlanCard";
import { formatPrice } from "../utils/formatPrice";

interface PlansProps {
  plans: Plan[];
}

export const Plans: React.FC<PlansProps> = ({ plans }) => {
  return (
    <div className="w-full">
      <ul className="flex flex-wrap items-start gap-5">
        {plans.map((plan) => {
          const { title, consultations, colorScheme } = getPlanDetails(plan);

          console.log(plan);

          // Default price display
          let priceDisplay = "N/A";

          // Format price correctly if available
          if (plan.monthly_price && plan.monthly_price.price) {
            // Price is in cents, divide by 100 to get dollars/euros
            const formattedPrice = formatPrice(plan.monthly_price);
            priceDisplay = formattedPrice;
          } else if (plan.is_free) {
            priceDisplay = "Gratis";
          }

          const buttonText = "Suscribir ahora";

          return (
            <li key={plan.id}>
              <PlanCard
                title={title}
                consultations={consultations}
                price={priceDisplay}
                buttonText={buttonText}
                colorScheme={colorScheme}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
