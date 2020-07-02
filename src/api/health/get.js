export default async function getHealth(server) {
  server.get('/health.txt', async (_, res) => {
    res.sendRaw('OK', { 'Content-Type': 'text/plain' });
  });
}
