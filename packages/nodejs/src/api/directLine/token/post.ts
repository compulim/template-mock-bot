// curl -L -X POST http://localhost:3978/api/directline/token

import { type Express } from 'express';

export default function postDirectLineToken(app: Express): void {
  app.post('/api/directline/token', async (_, res) =>
    res.setHeader('location', '/api/token/directline').sendStatus(308)
  );
}
