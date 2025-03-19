import { Link } from "@/modules/translations/i18n/routing";

export interface StaticPlan {
  id: number;
  tier: string;
  consultations: string;
  consultationsText: string;
  price: string;
  priceDetail: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonLink: string;
}

interface PlansProps {
  plans: StaticPlan[];
}

export const Plans: React.FC<PlansProps> = ({ plans }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex-1 border border-primary px-4 py-2 flex flex-col justify-between"
            style={{
              backgroundColor: plan.backgroundColor,
              color: plan.textColor,
            }}
          >
            <div>
              <h3 className="text-lg font-normal mb-8">{plan.tier}</h3>

              <div className="text-6xl font-semibold mb-1">
                {plan.consultations}
              </div>
              <div className="text-xl">{plan.consultationsText}</div>

              <div className="flex items-baseline mt-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-xl">{plan.priceDetail}</span>
              </div>
            </div>

            <Link
              href={plan.buttonLink}
              className={`mt-8 block py-2 font-medium text-lg underline ${
                plan.backgroundColor === "white"
                  ? "text-black"
                  : plan.backgroundColor === "#8A70D6"
                  ? "text-white"
                  : plan.backgroundColor === "#E8F056"
                  ? "text-black"
                  : "text-white"
              }`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
