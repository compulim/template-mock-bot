export default function trustedOrigin(origin) {
  return (
    !origin ||
    /^https?:\/\/localhost([\/:]|$)/.test(origin) ||
    /^https?:\/\/192\.168\.(0|1)\.\d{1,3}([\/:]|$)/.test(origin) ||
    origin === 'null' || // This is for file://index.html
    // This is for Docker tests, dotless domain
    /^https?:\/\/[\d\w]+([\/:]|$)/.test(origin) ||
    /^https?:\/\/[\d\w]+\.ngrok\.io(\/|$)/.test(origin) ||
    /^https?:\/\/webchat-playground\.azurewebsites\.net(\/|$)/.test(origin) ||
    /^https?:\/\/([\d\w]+\.)+botframework\.com(\/|$)/.test(origin) ||
    /^https:\/\/compulim\.github\.io(\/|$)/.test(origin) ||
    /^https:\/\/corinagum\.github\.io(\/|$)/.test(origin) ||
    /^https:\/\/microsoft\.github\.io(\/|$)/.test(origin) ||
    /^https:\/\/bfxwebchatfullbundle\.azurewebsites\.net(\/|$)/.test(origin) ||
    /^https:\/\/webchattest\.blob\.core\.windows\.net(\/|$)/.test(origin) ||
    // This is CodePen
    /^https:\/\/cdpn\.io(\/|$)/.test(origin) ||
    /^https:\/\/s\.codepen\.io(\/|$)/.test(origin)
  );
}
