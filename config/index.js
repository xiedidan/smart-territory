import _ from 'lodash';

const baseConfig = {
    app: {
        title: 'Smart-Territory',
        description: 'Smart-Territory',
        keywords: 'Smart-Territory',
    },
    apiVersion: 'v1.0',
    sessionCookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 1800000, // 10 mins
    }
};

// eslint-disable-next-line global-require
const envConfig = require(`./${process.env.NODE_ENV || 'development'}.js`) || {};

export default _.merge(
    baseConfig,
    envConfig
);
