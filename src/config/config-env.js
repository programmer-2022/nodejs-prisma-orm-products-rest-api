import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
const envFilePath = environment === 'production' ? '.env.prod' : '.env.dev';

dotenv.config({ path: envFilePath });