"use client";

import { useAuth } from "@clerk/nextjs";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getTranslations } from "@/modules/translations/lib/translations";

function createWidget(locale: "en" | "es") {
  const feedbackTexts = getTranslations(locale);

  return Sentry.getFeedback()?.createWidget({
    triggerLabel: feedbackTexts.triggerLabel,
    triggerAriaLabel: feedbackTexts.triggerLabel,
    formTitle: feedbackTexts.formTitle,
    submitButtonLabel: feedbackTexts.submitButtonLabel,
    cancelButtonLabel: feedbackTexts.cancelButtonLabel,
    nameLabel: feedbackTexts.nameLabel,
    namePlaceholder: feedbackTexts.namePlaceholder,
    emailLabel: feedbackTexts.emailLabel,
    emailPlaceholder: feedbackTexts.emailPlaceholder,
    isRequiredLabel: feedbackTexts.isRequiredText,
    messageLabel: feedbackTexts.messageLabel,
    messagePlaceholder: feedbackTexts.messagePlaceholder,
    successMessageText: feedbackTexts.successMessageText,
    addScreenshotButtonLabel: feedbackTexts.addScreenshotButtonLabel,
    removeScreenshotButtonLabel: feedbackTexts.removeScreenshotButtonLabel,
  });
}

const useFeedbackWidget = (shouldMount: boolean) => {
  const locale = useLocale();
  const [widget, setWidget] = useState<ReturnType<typeof createWidget> | null>(
    null
  );

  useEffect(() => {
    const handleWidget = () => {
      if (shouldMount) {
        if (widget) {
          try {
            widget.removeFromDom();
          } catch (error) {
            throw new Error(
              "Failed to remove widget, it may already be removed",
              error as ErrorOptions | undefined
            );
          }
        }

        try {
          const newWidget = createWidget(locale as "en" | "es");
          setWidget(newWidget);
        } catch (error) {
          console.error("Error creating Sentry feedback widget:", error);
        }
      } else if (widget) {
        try {
          widget.removeFromDom();
          setWidget(null);
        } catch (error) {
          setWidget(null);
          throw new Error(
            "Failed to remove widget, it may already be removed",
            error as ErrorOptions | undefined
          );
        }
      }
    };

    const timeoutId = setTimeout(handleWidget, 0);

    return () => {
      clearTimeout(timeoutId);
      if (widget) {
        try {
          widget.removeFromDom();
        } catch {
          // Ignore errors during cleanup
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldMount, locale]);
};

const SentryFeedbackWidget = () => {
  const auth = useAuth();
  useFeedbackWidget(!!auth?.isSignedIn);

  return null;
};

export default SentryFeedbackWidget;
