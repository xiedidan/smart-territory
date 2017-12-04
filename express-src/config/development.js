module.exports = {
    port: process.env.ST_PORT_DEV,
    mongoURL: process.env.ST_MONGO_URL_DEV,
    redis: {
        host: process.env.ST_REDIS_HOST_DEV,
        port: process.env.ST_REDIS_PORT_DEV
    },
    sessionSecret: process.env.ST_SESSION_SECRET_DEV,
    // The name of the MongoDB collection to store sessions in
    sessionCollection: process.env.ST_SESSION_COL_DEV,
    // The session cookie name
    sessionName: process.env.ST_SESSION_NAME_DEV
}
