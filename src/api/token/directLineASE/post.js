import generateDirectLineToken from '../../../utils/generateDirectLineToken.js';
import renewDirectLineToken from '../../../utils/renewDirectLineToken.js';
import trustedOrigin from '../../../trustedOrigin.js';

export default function postTokenDirectLineASE(server) {
  const { DIRECT_LINE_SECRET, WEBSITE_HOSTNAME } = process.env;

  server.post('/api/token/directlinease', async (req, res) => {
    try {
      if (!DIRECT_LINE_SECRET) {
        throw new TypeError('Environment variable "DIRECT_LINE_SECRET" must be set.');
      }

      if (!WEBSITE_HOSTNAME) {
        return res.send(500, 'only available on azure', { 'Access-Control-Allow-Origin': '*' });
      }

      const origin = req.header('origin');

      if (!trustedOrigin(origin)) {
        return res.send(403, 'not trusted origin', { 'Access-Control-Allow-Origin': '*' });
      }

      const { token } = req.query;

      try {
        const result = await (token
          ? renewDirectLineToken(token, { domain: `https://${WEBSITE_HOSTNAME}/.bot/` })
          : generateDirectLineToken(DIRECT_LINE_SECRET, { domain: `https://${WEBSITE_HOSTNAME}/.bot/` }));

        res.sendRaw(JSON.stringify(result, null, 2), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        });
      } catch (err) {
        res.send(500, err.message, { 'Access-Control-Allow-Origin': origin });
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
      res.send(500, { message: err.message, stack: err.stack }, { 'Access-Control-Allow-Origin': '*' });
    }
  });
}
