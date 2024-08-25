import dotenv from 'dotenv';
dotenv.config({ path: ['.env'] });

const config = {
  env: getEnvVar('NODE_ENV', 'development'),
  port: getEnvVar('PORT', 8000),
  frontEndUrl: getEnvVar('FRONT_END_URL'),
  backEndHost: getEnvVar('BACK_END_HOST'),
  jwt: {
    secret: getEnvVar('JWT_SECRET'),
  },
  db: {
    user: getEnvVar('POSTGRES_USER'),
    name: getEnvVar('POSTGRES_DB_NAME'),
    password: getEnvVar('POSTGRES_PASSWORD'),
    host: getEnvVar('POSTGRES_HOST', 'localhost'),
  },
};

export default config;

function getEnvVar(
  key: string,
  defaultValue: string | number | undefined = undefined
) {
  const value: string | undefined = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return (value || String(defaultValue)) as string;
}
