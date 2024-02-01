import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import {NextUIProvider} from "@nextui-org/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <main >
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)
