import { join } from 'path';
import { Output, object, optional, parse, string } from 'valibot';
import dotenv from 'dotenv';

// Import required bot configuration.
// const ENV_FILE = join(fileURLToPath(import.meta.url), '../../.env');
const ENV_FILE = join(__dirname, '../../../.env');

dotenv.config({ path: ENV_FILE });

const EnvSchema = object({
  APPSETTING_WEBSITE_SITE_NAME: optional(string()),
  BOT_OPENID_METADATA: optional(string()),
  CHANNEL_SERVICE: optional(string()),
  DIRECT_LINE_URL: optional(string()),
  DIRECT_LINE_SECRET: optional(string()),
  MicrosoftAppId: string(),
  MicrosoftAppPassword: string(),
  PORT: optional(string()),
  WEBSITE_HOSTNAME: optional(string())
});

parse(EnvSchema, process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends Output<typeof EnvSchema> {}
  }
}

export {};
