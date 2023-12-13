// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import './env.ts';

import { platform } from 'os';
import { createServer } from 'http';
import express from 'express';

import createBotFrameworkAdapter from './createBotFrameworkAdapter.js';
import EchoBot from './bot.js';
import setupAPI from './api/index.js';

const { APPSETTING_WEBSITE_SITE_NAME, PORT = 3978 } = process.env;

async function main(): Promise<void> {
  // Create HTTP server
  const app = express();
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`\n${app.name} listening to port ${PORT}`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
  });

  // Create adapter.
  const adapter = await createBotFrameworkAdapter();

  // Create the main dialog.
  const bot = new EchoBot();

  setupAPI(app, { adapter, bot, server });

  // Enable Direct Line App Service Extension
  // See https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-directline-extension-node-bot?view=azure-bot-service-4.0
  platform() === 'win32' &&
    adapter.useNamedPipe(context => bot.run(context), `${APPSETTING_WEBSITE_SITE_NAME}.directline`);
}

main();
