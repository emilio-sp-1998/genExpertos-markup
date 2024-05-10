import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import configureStore from './assets/redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import App from './App.jsx'
import './index.css'
const { persistor, store } = configureStore()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
