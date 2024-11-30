module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 587),
        secure: false, // true para puertos 465, false para otros
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("EMAIL_FROM", "no-reply@gmail.com"),
        defaultReplyTo: env("EMAIL_REPLY_TO", "support@gmail.com"),
      },
    },
  },
});
