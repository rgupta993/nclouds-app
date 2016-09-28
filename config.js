var config = {
  production: {
        redis: {
            port: 6379,
            host: "redis.service.consul",
            database: "nclouds",
            password: "nclouds"
        },

        APP_LISTEN_PORT: 4000
    }
}

module.exports = config;
