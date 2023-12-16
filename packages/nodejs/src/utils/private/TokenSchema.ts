import { number, object, optional, string } from 'valibot';

const TokenSchema = object({
  conversationId: string(),
  expires_in: number(),
  token: string(),
  userId: optional(string())
});

export default TokenSchema;
