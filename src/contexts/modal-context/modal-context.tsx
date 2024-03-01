import Modal  from "./../../components/Modal"
import React, { createContext, useContext, useState } from "react"

interface ModalProviderProps {
  children: React.ReactNode
}

interface defaultValuesProps {
  visible: boolean
  showModal: (body: React.ReactNode) => void
  hideModal: () => void
  modalContent: React.ReactNode
}

const defaultValues: defaultValuesProps = {
  visible: false,
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
}

const ModalContext = createContext(defaultValues)

export const useModal = () => {
  const state = useContext(ModalContext)
  return state
}

const { Provider } = ModalContext

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, setState] = useState({
    visible: false,
  })
  const [modalContent, setModalContent] = useState<React.ReactNode>()

  const showModal = (body: React.ReactNode) => {
    setState({ ...state, visible: true })
    if (body) {
      setModalContent(body)
    }
  }
  const hideModal = () => {
    setState({ ...state, visible: false })
  }

  return (
    <Provider
      value={{ visible: state.visible, showModal, hideModal, modalContent }}
    >
      <Modal onClose={hideModal} show={state.visible}>
        {modalContent}
      </Modal>
      {children}
    </Provider>
  )
}

export { ModalContext, ModalProvider, Modal }
