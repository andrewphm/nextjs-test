import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Redux
import { store, persistor } from '../redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp

// SSR app: Next.js
// -> database MongoDB
// -> react-loading-skeleton
// -> tailwind

// Folder Structure
// src
// -> Components,
// -> Constants,
// -> Context,
// -> helpers,
// -> lib (mongoDB connection)
