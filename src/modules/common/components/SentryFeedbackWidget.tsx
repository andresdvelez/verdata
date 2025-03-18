"use client";

import { useAuth } from "@clerk/nextjs";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const SentryFeedbackWidget = () => {
  const auth = useAuth();
  const locale = useLocale() as "en" | "es";
  const t = useTranslations("feedback");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [widget, setWidget] = useState<any | null>(null);
  const shouldMount = !!auth?.isSignedIn;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (shouldMount) {
        if (widget) {
          try {
            widget.removeFromDom();
          } catch (error) {
            console.error("Failed to remove existing widget:", error);
          }
        }

        try {
          const feedbackApi = Sentry.getFeedback();

          if (!feedbackApi) {
            console.error("Sentry feedback API not available");
            return;
          }

          const newWidget = feedbackApi.createWidget({
            triggerLabel: t("triggerLabel"),
            triggerAriaLabel: t("triggerLabel"),
            formTitle: t("formTitle"),
            submitButtonLabel: t("submitButtonLabel"),
            cancelButtonLabel: t("cancelButtonLabel"),
            nameLabel: t("nameLabel"),
            namePlaceholder: t("namePlaceholder"),
            emailLabel: t("emailLabel"),
            emailPlaceholder: t("emailPlaceholder"),
            isRequiredLabel: t("isRequiredText"),
            messageLabel: t("messageLabel"),
            messagePlaceholder: t("messagePlaceholder"),
            successMessageText: t("successMessageText"),
            addScreenshotButtonLabel: t("addScreenshotButtonLabel"),
            removeScreenshotButtonLabel: t("removeScreenshotButtonLabel"),
            confirmButtonLabel: t("confirmButtonLabel"),
          });

          setWidget(newWidget);
        } catch (error) {
          console.error(
            "Error creating or mounting Sentry feedback widget:",
            error
          );
        }
      } else if (widget) {
        try {
          widget.removeFromDom();
          setWidget(null);
        } catch (error) {
          setWidget(null);
          console.error("Failed to remove widget:", error);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (widget) {
        try {
          widget.removeFromDom();
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldMount, locale, t]);

  return null;
};

export default SentryFeedbackWidget;
