import getDirectLineTokens from './directLine/tokens/get.js';
import getHealth from './health/get.js';
import getReady from './ready/get.js';
import getRoot from './get.js';
import getTokenDirectLine from './token/directLine/get.js';
import postDirectLineToken from './directLine/token/post.js';
import postMessages from './messages/post.js';
import postSpeechServicesToken from './speechServices/token/post.js';
import postTokenDirectLine from './token/directLine/post.js';
import postTokenDirectLineASE from './token/directLineASE/post.js';
import postTokenSpeechServices from './token/speechServices/post.js';
import upgrade from './upgrade.js';

export default async function index(server, options) {
  await Promise.all(
    [
      getDirectLineTokens,
      getHealth,
      getReady,
      getRoot,
      getTokenDirectLine,
      postDirectLineToken,
      postMessages,
      postSpeechServicesToken,
      postTokenDirectLine,
      postTokenDirectLineASE,
      postTokenSpeechServices,
      upgrade
    ].map(handler => handler(server, options))
  );
}
