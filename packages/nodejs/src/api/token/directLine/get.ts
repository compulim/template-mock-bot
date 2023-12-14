import { type Express } from 'express';

import generateDirectLineToken from '../../../utils/generateDirectLineToken.js';
import setImmediateAndInterval from '../../../utils/setImmediateAndInterval.js';

type PregeneratedToken = Readonly<{
  conversationId: string;
  expiresIn: number;
  expiresAt: number;
  token: string;
}>;

const PREGENERATE_TOKEN_INTERVAL = 60000;

export default function getTokenDirectLine(server: Express): void {
  const { DIRECT_LINE_SECRET } = process.env;
  let pregeneratedTokens: PregeneratedToken[] = [];

  DIRECT_LINE_SECRET &&
    setImmediateAndInterval(async () => {
      try {
        const now = Date.now();
        const { conversationId, expires_in: expiresIn, token } = await generateDirectLineToken(DIRECT_LINE_SECRET);
        const expiresAt = now + expiresIn * 1000;

        pregeneratedTokens.push({
          conversationId,
          expiresIn,
          expiresAt,
          token
        });

        pregeneratedTokens = pregeneratedTokens.filter(
          token => token.expiresAt > Date.now() - PREGENERATE_TOKEN_INTERVAL
        );
      } catch (error) {}
    }, PREGENERATE_TOKEN_INTERVAL);

  server.get('/api/token/directline', async (_, res) => {
    if (!DIRECT_LINE_SECRET) {
      throw new TypeError('Environment variable "DIRECT_LINE_SECRET" must be set.');
    }

    try {
      res
        .setHeader('Content-Type', 'application/json')
        .setHeader('Cache-Control', 'no-cache')
        .send(
          JSON.stringify(
            {
              tokens: pregeneratedTokens.map(token => {
                const message1 = `This token will expires at ${new Date(token.expiresAt).toISOString()}`;
                const message2 =
                  Date.now() > token.expiresAt
                    ? 'And is expired.'
                    : `Or in about ${~~((token.expiresAt - Date.now()) / 1000)} seconds`;
                const separator = new Array(Math.max(message1.length, message2.length)).fill('-').join('');

                return {
                  human: [separator, message1, message2, separator],
                  ...token
                };
              })
            },
            null,
            2
          )
        );
    } catch (err) {
      res
        .sendStatus(500)
        .setHeader('Access-Control-Allow-Origin', '*')
        .send(err && err instanceof Error && { message: err.message, stack: err.stack });
    }
  });
}
