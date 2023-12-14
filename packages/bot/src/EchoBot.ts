import { ActivityHandler, MessageFactory, type ConversationState, type UserState } from 'botbuilder';

type BotInit = {
  conversationState?: ConversationState;
  userState?: UserState;
};

export default class EchoBot extends ActivityHandler {
  constructor({ conversationState, userState }: BotInit = {}) {
    super();

    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      const replyText = `Echo: ${context.activity.text}`;

      await context.sendActivity(MessageFactory.text(replyText, replyText));
      // By calling next() you ensure that the next BotHandler is run.
      await next();

      await conversationState?.saveChanges(context);
      await userState?.saveChanges(context);
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded || [];
      const welcomeText = 'Hello and welcome!';

      for (const { id } of membersAdded) {
        if (id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}
