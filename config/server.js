module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("BASE_URL", "https://junction.proxy.rlwy.net:29506"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  sessions: {
    cookie: {
      secure: env.bool("NODE_ENV", "production") === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  },
  proxy: true,
});
