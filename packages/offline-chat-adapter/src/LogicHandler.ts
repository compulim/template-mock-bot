import { type BotAdapter } from 'botbuilder';

export type LogicHandler = Parameters<BotAdapter['runMiddleware']>[1];
