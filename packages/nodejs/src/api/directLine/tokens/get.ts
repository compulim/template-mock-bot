// curl -L http://localhost:3978/api/directline/tokens

import { type Express } from 'express';

export default function getDirectLineTokens(app: Express): void {
  app.get('/api/directline/tokens', async (_, res) =>
    res.setHeader('location', '/api/token/directline').sendStatus(308)
  );
}
