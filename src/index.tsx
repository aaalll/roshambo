import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import AppContext from 'components/app/app-context';
import AppRoutes from 'components/app/app-routes';
import AppRoot from 'components/app/app-root';
import AppModal from 'components/app/app-modal';

ReactDOM.render(
  <AppContext>
    <AppRoot>
      <AppRoutes />
      <AppModal />
    </AppRoot>
  </AppContext>,
    document.getElementById('root')
);

serviceWorker.unregister();
