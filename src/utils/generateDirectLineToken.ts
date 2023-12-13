import { parse, type Output } from 'valibot';

import createUserId from './createUserId.js';
import TokenSchema from './private/TokenSchema.js';

export default async function (
  directLineSecret: string,
  { domain = process.env.DIRECT_LINE_URL || 'https://directline.botframework.com/', userId = createUserId() } = {}
): Promise<Output<typeof TokenSchema>> {
  console.log(
    `Generating Direct Line token using secret "${(directLineSecret || '').substr(0, 3)}...${(
      directLineSecret || ''
    ).substr(-3)}" and user ID "${userId}"`
  );

  const tokenRes = await fetch(`${domain}v3/directline/tokens/generate`, {
    // body: JSON.stringify({ User: { Id: userId } }),
    body: JSON.stringify({
      user: { id: userId },
      trustedOrigins: [`https://${process.env.WEBSITE_HOSTNAME}`]
    }),
    headers: {
      authorization: `Bearer ${directLineSecret}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (tokenRes.status !== 200) {
    console.log(await tokenRes.text());

    throw new Error(`Direct Line service returned ${tokenRes.status} while generating new token`);
  }

  const json = await tokenRes.json();

  if ('error' in json) {
    throw new Error(`Direct Line service responded ${JSON.stringify(json.error)} while generating new token`);
  }

  const result = parse(TokenSchema, json);

  return { ...result, userId: userId };
}
