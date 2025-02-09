require ('dotenv').config();

export default {
    SECRET: 'shorti-api',
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
}


