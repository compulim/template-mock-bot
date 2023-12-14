import './App.css';

import { createDirectLine } from '@npm-workspace/web';
import { memo, useMemo } from 'react';
import WebChat from 'botframework-webchat';

export default memo(function App() {
  const directLine = useMemo(() => createDirectLine(), []);

  return <WebChat className="webchat" directLine={directLine} />;
});
