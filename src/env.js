import { fileURLToPath } from 'url';
import { join } from 'path';
import dotenv from 'dotenv';

// Import required bot configuration.
const ENV_FILE = join(fileURLToPath(import.meta.url), '../../.env');

dotenv.config({ path: ENV_FILE });
