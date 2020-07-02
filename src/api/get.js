import prettyMS from 'pretty-ms';

export default async function getRoot(server) {
  const up = Date.now();

  server.get('/', async (_, res) => {
    const message = `MockBot2 is up since ${prettyMS(Date.now() - up)} ago.`;
    const separator = new Array(message.length).fill('-').join('');

    res.sendRaw(
      JSON.stringify(
        {
          human: [separator, message, separator],
          computer: {
            up
          }
        },
        null,
        2
      ),
      {
        'Content-Type': 'application/json'
      }
    );
  });
}
