export default async function upgrade(server, { adapter, bot }) {
  // Listen for Upgrade requests for Streaming.
  server.on('upgrade', (req, socket, head) => {
    adapter.useWebSocket(req, socket, head, async context => {
      // After connecting via WebSocket, run this logic for every request sent over
      // the WebSocket connection.
      await bot.run(context);
    });
  });
}
