import fetch from 'node-fetch';

import trustedOrigin from '../../../trustedOrigin';

export default async function postTokenSpeechServices(server) {
  const { SPEECH_SERVICES_REGION, SPEECH_SERVICES_SUBSCRIPTION_KEY } = process.env;

  server.post('/api/token/speechservices', async (req, res) => {
    try {
      if (!SPEECH_SERVICES_REGION || !SPEECH_SERVICES_SUBSCRIPTION_KEY) {
        return res.send(403, 'Cognitive Services Speech Services authorization token is unavailable.', { 'Access-Control-Allow-Origin': '*' });
      }

      const origin = req.header('origin');

      if (!trustedOrigin(origin)) {
        return res.send(403, 'not trusted origin', { 'Access-Control-Allow-Origin': '*' });
      }

      console.log(
        `Requesting Speech Services authorization token using subscription key "${SPEECH_SERVICES_SUBSCRIPTION_KEY.substr(
          0,
          3
        )}...${SPEECH_SERVICES_SUBSCRIPTION_KEY.substr(-3)}" for ${origin}`
      );

      const tokenRes = await fetch(
        `https://${SPEECH_SERVICES_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        {
          headers: { 'Ocp-Apim-Subscription-Key': SPEECH_SERVICES_SUBSCRIPTION_KEY },
          method: 'POST'
        }
      );

      if (!tokenRes.ok) {
        return res.send(500, { 'Access-Control-Allow-Origin': '*' });
      }

      const authorizationToken = await tokenRes.text();
      const message = '"token" is being deprecated, use "authorizationToken" instead.';
      const separator = new Array(message.length).fill('-').join('');

      res.sendRaw(
        JSON.stringify(
          {
            authorizationToken,
            human: [separator, message, separator],
            region: SPEECH_SERVICES_REGION,
            token: authorizationToken
          },
          null,
          2
        ),
        {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      );
    } catch (err) {
      res.send(500, { message: err.message, stack: err.stack }, { 'Access-Control-Allow-Origin': '*' });
    }
  });
}
