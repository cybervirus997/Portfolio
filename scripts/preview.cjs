// Adapt the managed preview CLI's flags to Create React App's environment API.
const { spawn } = require('child_process');
const args = process.argv.slice(2);
function flag(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const child = spawn(process.execPath, ['--openssl-legacy-provider', require.resolve('react-scripts/scripts/start')], {
  stdio: 'inherit',
  env: { ...process.env, HOST: flag('--host', '0.0.0.0'), PORT: flag('--port', process.env.PORT || '3000'), BROWSER: 'none' },
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code || 0));
