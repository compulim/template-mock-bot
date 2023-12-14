import { type Express } from 'express';

export default function getReady(app: Express): void {
  app.get('/ready.txt', async (_, res): Promise<void> => {
    try {
      const botRes = await fetch(`https://${process.env.WEBSITE_HOSTNAME}/.bot/`);

      if (!botRes.ok) {
        res.status(500).send(`Direct Line App Service Extension is returning status code ${botRes.status}.`);

        return;
      }

      const { ib: inbound, ob: outbound } = await botRes.json();

      if (!inbound || !outbound) {
        res.status(500).send('Direct Line App Service Extension is not ready.');

        return;
      }

      res.setHeader('Content-Type', 'text/plain').send('OK');
    } catch (err) {
      res
        .status(500)
        .setHeader('Access-Control-Allow-Origin', '*')
        .send(err && err instanceof Error && { message: err.message, stack: err.stack });
    }
  });
}
