import { type Express } from 'express';
import prettyMS from 'pretty-ms';

export default function getRoot(app: Express): void {
  const up = Date.now();

  app.get('/', async (_, res) => {
    const message = `Bot is up since ${prettyMS(Date.now() - up)} ago.`;
    const separator = new Array(message.length).fill('-').join('');

    res.setHeader('Content-Type', 'application/json').send({
      human: [separator, message, separator],
      computer: { up }
    });
  });
}
