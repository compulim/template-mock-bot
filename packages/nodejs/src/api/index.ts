import { type ActivityHandler, type BotFrameworkAdapter } from 'botbuilder';
import { type Express } from 'express';
import { type Server } from 'http';

import getDirectLineTokens from './directLine/tokens/get.js';
import getHealth from './health/get.js';
import getReady from './ready/get.js';
import getRoot from './get.js';
import getTokenDirectLine from './token/directLine/get.js';
import postDirectLineToken from './directLine/token/post.js';
import postMessages from './messages/post.js';
import postTokenDirectLine from './token/directLine/post.js';
import postTokenDirectLineASE from './token/directLineASE/post.js';
import upgrade from './upgrade.js';

type AppInit = {
  adapter: BotFrameworkAdapter;
  bot: ActivityHandler;
  server: Server;
};

export default async function index(server: Express, init: AppInit): Promise<void> {
  await [
    getDirectLineTokens,
    getHealth,
    getReady,
    getRoot,
    getTokenDirectLine,
    postDirectLineToken,
    postMessages,
    postTokenDirectLine,
    postTokenDirectLineASE,
    upgrade
  ].map(handler => handler(server, init));
}
