import { type Express } from 'express';

export default function getHealth(app: Express): void {
  app.get('/health.txt', (_, res) => res.setHeader('Content-Type', 'text/plain').send('OK'));
}
