import generateDirectLineToken from '../../../utils/generateDirectLineToken';
import renewDirectLineToken from '../../../utils/renewDirectLineToken';
import trustedOrigin from '../../../trustedOrigin';

export default function postTokenDirectLine(server) {
  const { DIRECT_LINE_SECRET } = process.env;

  if (!DIRECT_LINE_SECRET) {
    throw new TypeError('Environment variable "DIRECT_LINE_SECRET" must be set.');
  }

  server.post('/api/token/directline', async (req, res) => {
    try {
      const origin = req.header('origin');

      if (!trustedOrigin(origin)) {
        return res.send(403, 'not trusted origin', { 'Access-Control-Allow-Origin': '*' });
      }

      const { token } = req.query;

      try {
        const result = await (token ? renewDirectLineToken(token) : generateDirectLineToken(DIRECT_LINE_SECRET));
        const { conversationId, userId } = result;

        const message = `"conversationID" and "userID" is being deprecated, please use "conversationId" and "userId" instead.`;
        const separator = new Array(message.length).fill('-').join('');

        res.sendRaw(
          JSON.stringify(
            {
              ...result,
              conversationId,
              conversationID: conversationId,
              userId,
              userID: userId,
              human: [separator, message, separator]
            },
            null,
            2
          ),
          { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        );
      } catch (err) {
        res.send(500, err.message, { 'Access-Control-Allow-Origin': '*' });
      }

      if (token) {
        console.log(`Refreshing Direct Line token for ${origin}`);
      } else {
        console.log(
          `Requesting Direct Line token for ${origin} using secret "${DIRECT_LINE_SECRET.substr(
            0,
            3
          )}...${DIRECT_LINE_SECRET.substr(-3)}"`
        );
      }
    } catch (err) {
      res.send(500, { message: err.message, stack: err.stack }, { 'Access-Control-Allow-Origin': '*' });
    }
  });
}
