import { type Express } from 'express';

import generateDirectLineToken from '../../../utils/generateDirectLineToken.js';
import renewDirectLineToken from '../../../utils/renewDirectLineToken.js';
import trustedOrigin from '../../../trustedOrigin.js';

export default function postTokenDirectLineASE(app: Express): void {
  const { DIRECT_LINE_SECRET, WEBSITE_HOSTNAME } = process.env;

  app.post('/api/token/directlinease', async (req, res): Promise<void> => {
    try {
      if (!DIRECT_LINE_SECRET) {
        throw new TypeError('Environment variable "DIRECT_LINE_SECRET" must be set.');
      }

      if (!WEBSITE_HOSTNAME) {
        res.status(500).setHeader('Access-Control-Allow-Origin', '*').send('only available on azure');

        return;
      }

      const origin = req.header('origin');

      if (!trustedOrigin(origin)) {
        res.status(403).setHeader('Access-Control-Allow-Origin', '*').send('not trusted origin');

        return;
      }

      const { token } = req.query;
      const firstToken = token && (Array.isArray(token) ? token[0] : token) + '';

      try {
        const result = await (firstToken
          ? renewDirectLineToken(firstToken, { domain: `https://${WEBSITE_HOSTNAME}/.bot/` })
          : generateDirectLineToken(DIRECT_LINE_SECRET, { domain: `https://${WEBSITE_HOSTNAME}/.bot/` }));

        res.setHeader('Access-Control-Allow-Origin', '*').setHeader('Content-Type', 'application/json').send(result);
      } catch (err) {
        res.status(500);
        origin && res.setHeader('Access-Control-Allow-Origin', origin);
        res.send(err && err instanceof Error && err.message);
      }

      if (token) {
        console.log(`Refreshing Direct Line token for ${origin}`);
      } else {
        console.log(
          `Requesting Direct Line token for ${origin} using secret "${DIRECT_LINE_SECRET.substr(
            0,
            3
          )}...${DIRECT_LINE_SECRET.substr(-3)}"`
        );
      }
    } catch (err) {
      res
        .status(500)
        .setHeader('Access-Control-Allow-Origin', '*')
        .send(err && err instanceof Error && { message: err.message, stack: err.stack });
    }
  });
}
