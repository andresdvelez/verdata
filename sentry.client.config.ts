import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4f0e0596f8abb0000668464ec924f616@o4508977647386624.ingest.us.sentry.io/4508977738547200",

  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      autoInject: false,
      showBranding: false,
    }),
  ],

  tracesSampleRate: 1,

  replaysSessionSampleRate: 0.1,

  replaysOnErrorSampleRate: 1.0,

  debug: false,
});
