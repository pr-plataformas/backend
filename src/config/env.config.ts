import { config } from 'dotenv';

// Cargar variables de entorno desde .env.local para desarrollo
if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' });
}

export const envConfig = {
  app: {
    port: parseInt(process.env.APP_PORT) || 9999,
    environment: process.env.NODE_ENV || 'development',
  },
  postgres: {
    dbName: process.env.POSTGRES_DB || 'clinic_hub_db',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    password: process.env.POSTGRES_PASSWORD || 'anashei',
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
  },
  jwt: {
    accessSecret: process.env.ACCESS_JWT_SECRET || 'default-access-secret',
    refreshSecret: process.env.REFRESH_JWT_SECRET || 'default-refresh-secret',
    accessExpiresIn: process.env.ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
};
