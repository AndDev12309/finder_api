module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("BASE_URL", "https://finder-api-production-2024.up.railway.app"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  sessions: {
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    },
  },
});
