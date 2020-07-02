import getBotFrameworkWebChatVersions from './versions/botFrameworkWebChat/get';
import getDirectLineTokens from './directLine/tokens/get';
import getHealth from './health/get';
import getReady from './ready/get';
import getRoot from './get';
import getTokenDirectLine from './token/directLine/get';
import postDirectLineToken from './directLine/token/post';
import postMessages from './messages/post';
import postSpeechServicesToken from './speechServices/token/post';
import postTokenDirectLine from './token/directLine/post';
import postTokenDirectLineASE from './token/directLineASE/post';
import postTokenSpeechServices from './token/speechServices/post';
import upgrade from './upgrade';

export default async function index(server, options) {
  await Promise.all(
    [
      getBotFrameworkWebChatVersions,
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
