// lib/translations.js
import { createTranslator } from "next-intl";

// Load translations directly
const translations = {
  en: {
    feedback: {
      buttonLabel: "Report a Bug",
      submitButtonLabel: "Send Bug Report",
      cancelButtonLabel: "Cancel",
      formTitle: "Report a Bug",
      nameLabel: "Name",
      namePlaceholder: "Your Name",
      emailLabel: "Email",
      emailPlaceholder: "your.email@example.org",
      messageLabel: "Description",
      messagePlaceholder: "What's the bug? What did you expect?",
      successMessageText: "Thank you for your report!",
      isRequiredText: "(required)",
      addScreenshotButtonLabel: "Add screenshot",
      removeScreenshotButtonLabel: "Remove screenshot",
    },
  },
  es: {
    feedback: {
      buttonLabel: "Reportar un error",
      submitButtonLabel: "Enviar informe de error",
      cancelButtonLabel: "Cancelar",
      formTitle: "Reportar un error",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu.correo@ejemplo.org",
      messageLabel: "Descripción",
      messagePlaceholder: "¿Cuál es el error? ¿Qué esperabas?",
      successMessageText: "¡Gracias por tu informe!",
      isRequiredText: "(obligatorio)",
      addScreenshotButtonLabel: "Añadir captura de pantalla",
      removeScreenshotButtonLabel: "Descartar captura de pantalla",
    },
  },
  // other languages
};

export function getTranslations(locale: "en" | "es") {
  const t = createTranslator({
    locale,
    messages: translations[locale] || translations["en"],
  });

  return {
    triggerLabel: t("feedback.buttonLabel"),
    submitButtonLabel: t("feedback.submitButtonLabel"),
    cancelButtonLabel: t("feedback.cancelButtonLabel"),
    formTitle: t("feedback.formTitle"),
    nameLabel: t("feedback.nameLabel"),
    namePlaceholder: t("feedback.namePlaceholder"),
    emailLabel: t("feedback.emailLabel"),
    emailPlaceholder: t("feedback.emailPlaceholder"),
    messageLabel: t("feedback.messageLabel"),
    messagePlaceholder: t("feedback.messagePlaceholder"),
    successMessageText: t("feedback.successMessageText"),
    isRequiredText: t("feedback.isRequiredText"),
    addScreenshotButtonLabel: t("feedback.addScreenshotButtonLabel"),
    removeScreenshotButtonLabel: t("feedback.removeScreenshotButtonLabel"),
  };
}
