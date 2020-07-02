import random from 'math-random';

export default function createUserID() {
  return `dl_${random().toString(36).substr(2)}`;
}
