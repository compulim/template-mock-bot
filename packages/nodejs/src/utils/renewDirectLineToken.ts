import { parse, type Output } from 'valibot';

import TokenSchema from './private/TokenSchema';

export default async function renewDirectLineToken(
  token: string,
  { domain = process.env.DIRECT_LINE_URL || 'https://directline.botframework.com/' } = {}
): Promise<Output<typeof TokenSchema>> {
  // TODO: We could use the "iss" in the token, as long as they are trusted.
  console.log(`Renewing Direct Line token using token "${token.substr(0, 3)}...${token.substr(-3)}"`);

  const tokenRes = await fetch(`${domain}/v3/directline/tokens/refresh`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (tokenRes.status === 200) {
    const json = await tokenRes.json();

    if ('error' in json) {
      throw new Error(`Direct Line service responded ${JSON.stringify(json.error)} while renewing token`);
    } else {
      return parse(TokenSchema, json);
    }
  } else {
    throw new Error(`Direct Line service returned ${tokenRes.status} while renewing token`);
  }
}
