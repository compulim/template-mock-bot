import { type Express } from 'express';

import generateDirectLineToken from '../../../utils/generateDirectLineToken.js';
import renewDirectLineToken from '../../../utils/renewDirectLineToken.js';
import trustedOrigin from '../../../trustedOrigin.js';

export default function postTokenDirectLine(app: Express): void {
  const { DIRECT_LINE_SECRET } = process.env;

  app.post('/api/token/directline', async (req, res): Promise<void> => {
    try {
      if (!DIRECT_LINE_SECRET) {
        throw new TypeError('Environment variable "DIRECT_LINE_SECRET" must be set.');
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
          ? renewDirectLineToken(firstToken)
          : generateDirectLineToken(DIRECT_LINE_SECRET));
        const { conversationId, userId } = result;

        const message = `"conversationID" and "userID" is being deprecated, please use "conversationId" and "userId" instead.`;
        const separator = new Array(message.length).fill('-').join('');

        res
          .setHeader('Access-Control-Allow-Origin', '*')
          .setHeader('Content-Type', 'application/json')
          .send({
            ...result,
            conversationId,
            conversationID: conversationId,
            userId,
            userID: userId,
            human: [separator, message, separator]
          });
      } catch (err) {
        res
          .status(500)
          .setHeader('Access-Control-Allow-Origin', '*')
          .send(err && err instanceof Error && err.message);
      }

      if (token) {
        console.log(`Refreshing Direct Line token for ${origin}`);
      } else {
        console.log(
          `Requesting Direct Line token for ${origin} using secret "${DIRECT_LINE_SECRET.substring(
            0,
            3
          )}...${DIRECT_LINE_SECRET.substring(-3)}"`
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
