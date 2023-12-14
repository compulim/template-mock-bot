import { type ActivityHandler, type BotFrameworkAdapter } from 'botbuilder';
import { type Express } from 'express';

export default function postMessages(
  app: Express,
  { adapter, bot }: { adapter: BotFrameworkAdapter; bot: ActivityHandler }
): void {
  // Listen for incoming requests.
  app.post('/api/messages', (req, res, _) =>
    adapter.processActivity(req, res, async context => {
      // Route to main dialog.
      await bot.run(context);
    })
  );
}
