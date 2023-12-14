import { ConversationState, MemoryStorage, UserState } from 'botbuilder';
import { EchoBot } from '@npm-workspace/bot';

import { type LogicHandler } from './LogicHandler';
import WebChatAdapter from './WebChatAdapter';

type CreateDirectLineInit = {
  processor?: LogicHandler;
};

export const createDirectLine = ({ processor }: CreateDirectLineInit = {}) => {
  const botAdapter = new WebChatAdapter();

  if (!processor) {
    const memory = new MemoryStorage();
    const conversationState = new ConversationState(memory);
    const userState = new UserState(memory);

    const bot = new EchoBot({ conversationState, userState });

    botAdapter.processActivity(context => bot.run(context));
  } else {
    botAdapter.processActivity(processor);
  }

  return botAdapter.botConnection;
};
