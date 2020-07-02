// curl -L -X POST http://localhost:3978/api/directline/token

export default function postDirectLineToken(server) {
  server.post('/api/directline/token', async (_, res) => {
    res.send(308, '', { location: '/api/token/directline' });
  });
}
