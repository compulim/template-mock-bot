import random from 'math-random';

export default function createUserID(): `dl_${string}` {
  return `dl_${random().toString(36).substring(2)}`;
}
