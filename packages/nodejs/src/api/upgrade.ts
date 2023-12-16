import { type ActivityHandler, type BotFrameworkAdapter } from 'botbuilder';
import { type Express } from 'express';
import { type Server } from 'http';

export default function upgrade(
  _: Express,
  { adapter, bot, server }: { adapter: BotFrameworkAdapter; bot: ActivityHandler; server: Server }
): void {
  // Listen for Upgrade requests for Streaming.
  server.on('upgrade', (req, socket, head) => {
    // TODO: Fix the incompatibility between NodeJS.Duplex and INodeSocket.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adapter.useWebSocket(req, socket as any, head, async context => {
      // After connecting via WebSocket, run this logic for every request sent over
      // the WebSocket connection.
      await bot.run(context);
    });
  });
}
