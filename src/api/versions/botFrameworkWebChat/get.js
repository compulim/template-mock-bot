import trustedOrigin from '../../../trustedOrigin.js';

const VERSION_REQUEST_VALID_FOR = 60000;

export default async function getBotFrameworkWebChatVersions(server) {
  let lastGetVersionAt = 0;
  let lastGetVersionResponse = null;

  server.get('/versions/botframework-webchat', async (req, res) => {
    const now = Date.now();

    if (now - lastGetVersionAt > VERSION_REQUEST_VALID_FOR) {
      let json;

      try {
        const res = await fetch('https://registry.npmjs.org/botframework-webchat/', {
          headers: {
            accept: 'application/json'
          }
        });

        json = await res.json();
      } catch (err) {
        if (err) {
          return alert('Failed to fetch version list from NPMJS. Please check network trace for details.');
        }
      }

      const { time, versions } = json;

      lastGetVersionResponse = {
        refresh: new Date(now).toISOString(),
        versions: Object.values(versions)
          .sort((x, y) => {
            x = new Date(time[x.version]);
            y = new Date(time[y.version]);

            return x > y ? -1 : x < y ? 1 : 0;
          })
          .map(({ version }) => ({
            time: time[version],
            version: version
          }))
      };

      lastGetVersionAt = now;
    }

    res.send(lastGetVersionResponse, trustedOrigin(req.header('origin')) ? { 'Access-Control-Allow-Origin': '*' } : {});
  });
}
