let lastNow = -Infinity;

export default function incrementalNow(): number {
  let now = Date.now();

  if (lastNow >= now) {
    now = lastNow + 1;
  }

  lastNow = now;

  return now;
}
