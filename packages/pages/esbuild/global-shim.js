import Buffer from 'buffer';

window.global = window;

window.process = {
  env: {},
  version: ''
};

window.Buffer = Buffer;
