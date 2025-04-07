import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { useTranslations } from "next-intl";

interface SubscriptionOverlayProps {
  onBuyCredits: () => void;
}

export const SubscriptionOverlay: React.FC<SubscriptionOverlayProps> = ({
  onBuyCredits,
}) => {
  const t = useTranslations("report.content");

  return (
    <Card className="flex flex-col items-center text-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm z-10">
      <CardHeader className="text-4xl font-semibold justify-center">
        {t("found-your-report")}
      </CardHeader>
      <CardBody className="text-xl font-semibold">
        {t("not-subscribed-to-see-full-report")}
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button
          onPress={onBuyCredits}
          className="bg-primary text-background"
          variant="solid"
          radius="sm"
        >
          {t("buy-more-credits")}
        </Button>
      </CardFooter>
    </Card>
  );
};
