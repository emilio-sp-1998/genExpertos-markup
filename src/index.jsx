import React from 'react'
import {createRoot} from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import App from './App.jsx'
import './index.css'
import {store, persistor} from './assets/redux/store.js'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
