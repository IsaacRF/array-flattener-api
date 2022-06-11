// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    /**
     * Server config
     */
    server: {
        port: 3000,
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api'
    },
    /**
     * Used by winston logger
     */
    logs: {
        level: 'silly',
    },
}