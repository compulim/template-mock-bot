export default function trustedOrigin(origin: string | undefined): boolean {
  return (
    !origin ||
    // localhost
    /^https?:\/\/localhost([/:]|$)/.test(origin) ||
    // This is for Docker tests, dotless domain
    /^https?:\/\/[\d\w]+([/:]|$)/.test(origin) ||
    // This is for *.ngrok.io
    /^https?:\/\/[\d\w]+\.ngrok\.io(\/|$)/.test(origin) ||
    // This is for compulim.github.io/webchat-loader
    /^https:\/\/compulim\.github\.io(\/|$)/.test(origin) ||
    // This is for GitHub Codespaces
    /^https:\/\/[\d\w-]+\.(preview\.){0,1}app\.github\.dev(\/|$)/.test(origin) ||
    // This is for CodePen
    /^https:\/\/cdpn\.io(\/|$)/.test(origin) ||
    /^https:\/\/s\.codepen\.io(\/|$)/.test(origin)
  );
}
