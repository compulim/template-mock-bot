// curl -L http://localhost:3978/api/directline/tokens

export default function getDirectLineTokens(server) {
  server.get('/api/directline/tokens', async (_, res) => {
    res.send(308, '', { location: '/api/token/directline' });
  });
}
