export default async function upgrade(server, { bot }) {
  // Listen for Upgrade requests for Streaming.
  server.on('upgrade', (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter({
      appId: process.env.MicrosoftAppId,
      appPassword: process.env.MicrosoftAppPassword
    });

    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler;

    streamingAdapter.useWebSocket(req, socket, head, async context => {
      // After connecting via WebSocket, run this logic for every request sent over
      // the WebSocket connection.
      await bot.run(context);
    });
  });
}
