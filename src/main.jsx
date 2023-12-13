import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'


mapboxgl.accessToken = 'pk.eyJ1IjoibGVzdGF0eCIsImEiOiJjbDRxNGxvazMwMTVzM2RyemtzbDBvZnFoIn0.1Z-Eve85dnZLmkCs6BQ5Tw';
/* import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: "https://96df536c17cc12868e6336a8d572aeab@o4506361443844096.ingest.sentry.io/4506361503940608",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
}); */
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  // </React.StrictMode>,
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
