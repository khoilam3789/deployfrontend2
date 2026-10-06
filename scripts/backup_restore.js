import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverDir = path.join(__dirname, '../server');
const scriptPath = path.join(serverDir, 'backup_restore.js');

const args = [scriptPath, ...process.argv.slice(2)];
const child = spawn('node', args, { cwd: serverDir, stdio: 'inherit' });

child.on('exit', (code) => {
  process.exit(code || 0);
});
