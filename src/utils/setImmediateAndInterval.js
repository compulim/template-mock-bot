export default function setImmediateAndInterval(fn, ms) {
  setImmediate(fn);

  return setInterval(fn, ms);
}
