import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux';
import { store } from './../app/store';
import { LanguageProvider } from '../components/LanguageContext';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
      <LanguageProvider>
      <Component {...pageProps} />
      </LanguageProvider>
      </Provider>
    </SessionProvider>
  )
}