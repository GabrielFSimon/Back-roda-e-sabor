import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

// try alternative resolution for Windows paths
const resolvedEnvPath = path.resolve(process.cwd(), '.env');

const finalEnvPath = fs.existsSync(envPath) ? envPath : (fs.existsSync(resolvedEnvPath) ? resolvedEnvPath : null);

if (finalEnvPath && fs.existsSync(finalEnvPath)) {
  const lines = fs.readFileSync(finalEnvPath, 'utf8').split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = value;
  });
}

export default process.env;