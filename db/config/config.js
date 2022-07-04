import 'dotenv/config';

export default {
    development: {
        username: process.env.DEV_USERNAME,
        password: process.env.DEV_PASSWORD,
        database: process.env.DEV_DB,
        host: process.env.DEV_HOST,
        dialect: 'postgres',
      },
      test: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
        database: process.env.TEST_DB,
        host: process.env.TEST_HOST,
        dialect: 'postgres',
      },
      production: {
        username: process.env.PROD_USERNAME,
        password: process.env.PROD_PASSWORD,
        database: process.env.PROD_DB,
        host: process.env.PROD_HOST,
        dialect: 'postgres',
      }
}