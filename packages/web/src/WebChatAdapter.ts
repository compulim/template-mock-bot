import { ConnectionStatus } from 'botframework-directlinejs';
import { BotAdapter, ConversationState, MemoryStorage, TurnContext, UserState } from 'botbuilder';
import Observable from './private/Observable';

import MockBot from '../MockBot';
import dateNow from './utils/dateNow';

export const USER_PROFILE = { id: 'user', role: 'user' };
export const BOT_PROFILE = { id: 'bot', name: 'bot', role: 'bot' };

/**
 * Custom BotAdapter used for deploying a bot in a browser.
 */
export default class WebChatAdapter extends BotAdapter {
  constructor() {
    super();

    this.botConnection = {
      connectionStatus$: new Observable(observer => {
        observer.next(ConnectionStatus.Uninitialized);
        observer.next(ConnectionStatus.Connecting);
        observer.next(ConnectionStatus.Online);
      }),
      activity$: new Observable(observer => {
        this.activityObserver = observer;
      }),
      end() {},
      getSessionId: () => new Observable(observer => observer.complete()),
      postActivity: activity => {
        const now = dateNow();
        const timestamp = new Date(now).toISOString();
        const id = now + Math.random().toString(36);

        return new Observable(observer => {
          const serverActivity = {
            ...activity,
            id,
            conversation: { id: 'bot' },
            channelId: 'webchat',
            recipient: BOT_PROFILE,
            timestamp
          };

          this.onReceive(serverActivity).then(() => {
            observer.next(id);
            observer.complete();

            this.activityObserver.next(serverActivity);
          });
        });
      }
    };
  }

  async continueConversation(reference, logic) {
    const activity = TurnContext.applyConversationReference(
      { type: 'event', name: 'continueConversation' },
      reference,
      true
    );
    const context = new TurnContext(this, activity);
    return await this.runMiddleware(context, logic as any);
  }

  /**
   * This WebChatAdapter implements the sendActivities method which is called by the TurnContext class.
   * It's also possible to write a custom TurnContext with different methods of accessing an adapter.
   * @param {TurnContext} context
   * @param {Activity[]} activities
   */
  async sendActivities(context, activities) {
    const activityData = {
      channelId: 'webchat',
      conversation: { id: 'bot' },
      from: BOT_PROFILE,
      recipient: USER_PROFILE
    };

    const sentActivities = activities.map(activity => {
      const now = dateNow();

      return {
        ...activity,
        ...activityData,
        id: now + Math.random().toString(36),
        timestamp: new Date(now).toISOString()
      };
    });

    return sentActivities.map(activity => {
      const { id } = activity;
      this.activityObserver.next(activity);
      return { id };
    });
  }

  /**
   * Registers the business logic for the adapter, it takes a handler that takes a TurnContext object as a parameter.
   * @param {function} logic The driver code of the developer's bot application. This code receives and responds to user messages.
   */
  processActivity(logic) {
    this.logic = logic;
    return this;
  }

  /**
   * Runs the bot's middleware pipeline in addition to any business logic, if `this.logic` is found.
   * @param {Activity} activity
   */
  onReceive(activity) {
    const context = new TurnContext(this, activity);

    // Runs the middleware pipeline followed by any registered business logic.
    return this.runMiddleware(context, this.logic || function() {});
  }
}

export const createDirectLine = ({ processor } = {}) => {
  const mockBotAdapter = new WebChatAdapter();

  if (!processor) {
    const memory = new MemoryStorage();
    const conversationState = new ConversationState(memory);
    const userState = new UserState(memory);

    const mockBot = new MockBot({ conversationState, userState });

    mockBotAdapter.processActivity(async context => {
      await mockBot.run(context);
    });
  } else {
    mockBotAdapter.processActivity(processor);
  }

  return mockBotAdapter.botConnection;
};
