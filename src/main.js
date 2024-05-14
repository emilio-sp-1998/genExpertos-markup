import React from 'react'
import {ReactDOM, createRoot} from 'react-dom/client'
import { Provider } from 'react-redux'
import configureStore from './assets/redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import App from './App.jsx'
import './index.css'
const { persistor, store } = configureStore()

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
