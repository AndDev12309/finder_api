const { RateLimit } = require("koa2-ratelimit");

const emailRateLimit = RateLimit.middleware({
  interval: { hour: 24 },
  max: 5,
  message: "Too many requests from this IP, please try again later.",
});

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/email/send-email",
      handler: "contact-mail.sendMail",
      config: {
        auth: false,
        middlewares: [emailRateLimit],
      },
    },
  ],
};
