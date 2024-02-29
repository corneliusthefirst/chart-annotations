import React from "react"
import Layout from "../screens/Layout"
import { Provider } from "react-redux"
import { persistor, store } from "../store"
import { PersistGate } from "redux-persist/integration/react"
import { ModalProvider } from "../contexts/modal-context/modal-context"

interface AppProviderProps {
  children: React.ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  return (
    <React.StrictMode>
      <ModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              {children}
            </Layout>
          </PersistGate>
        </Provider>
      </ModalProvider>
    </React.StrictMode>
  )
}

export default AppProvider