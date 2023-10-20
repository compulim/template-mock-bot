export default async function postMessages(server, { adapter, bot }) {
  // Listen for incoming requests.
  server.post('/api/messages', (req, res, _) => {
    adapter.processActivity(req, res, async context => {
      // Route to main dialog.
      await bot.run(context);
    });
  });
}
