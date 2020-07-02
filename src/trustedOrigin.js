export default function trustedOrigin(origin) {
  return (
    !origin ||

    // localhost
    /^https?:\/\/localhost([\/:]|$)/.test(origin) ||

    // 192.168.0.* and 192.168.1.*
    /^https?:\/\/192\.168\.(0|1)\.\d{1,3}([\/:]|$)/.test(origin) ||

    // This is for file://index.html
    origin === 'null' ||

    // This is for Docker tests, dotless domain
    /^https?:\/\/[\d\w]+([\/:]|$)/.test(origin) ||

    // This is for *.ngrok.io
    /^https?:\/\/[\d\w]+\.ngrok\.io(\/|$)/.test(origin) ||

    // This is for compulim.github.io/webchat-loader
    /^https:\/\/compulim\.github\.io(\/|$)/.test(origin) ||

    // This is CodePen
    /^https:\/\/cdpn\.io(\/|$)/.test(origin) ||
    /^https:\/\/s\.codepen\.io(\/|$)/.test(origin)
  );
}
