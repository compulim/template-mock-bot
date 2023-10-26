export default async function getReady(server) {
  server.get('/ready.txt', async (_, res) => {
    try {
      const botRes = await fetch(`https://${process.env.WEBSITE_HOSTNAME}/.bot/`);

      if (!botRes.ok) {
        return res.send(500, `Direct Line App Service Extension is returning status code ${botRes.status}.`);
      }

      const { ib: inbound, ob: outbound } = await botRes.json();

      if (!inbound || !outbound) {
        return res.send(500, 'Direct Line App Service Extension is not ready.');
      }

      res.sendRaw('OK', { 'Content-Type': 'text/plain' });
    } catch (err) {
      res.send(500, { message: err.message, stack: err.stack }, { 'Access-Control-Allow-Origin': '*' });
    }
  });
}
