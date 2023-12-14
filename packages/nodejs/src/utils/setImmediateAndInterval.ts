export default function setImmediateAndInterval(fn: () => void, durationInMS: number): ReturnType<typeof setInterval> {
  fn();

  return setInterval(fn, durationInMS);
}
