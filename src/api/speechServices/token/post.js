// curl -L -X POST http://localhost:3978/api/speechservices/token

export default function postSpeechServicesToken(server) {
  server.post('/api/speechservices/token', async (_, res) => {
    res.send(308, '', { location: '/api/token/speechservices' });
  });
}
