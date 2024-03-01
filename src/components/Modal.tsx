import React, {
  useEffect,
  useCallback,
  ComponentPropsWithoutRef,
  useRef,
} from "react"
import classNames from "classnames"

interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const closeOnEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && show) {
        onClose()
      }
    },
    [show, onClose]
  )


  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape, true)

    return () => {
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [closeOnEscape])

  return (
    <div
      className={classNames(
        `fixed h-full w-full top-0 left-0 z-50 flex items-center justify-center`,
        {
          "opacity-0 pointer-events-none animate-slide-out-right": !show,
          "overflow-x-hidden overflow-y-visible bg-gray-900 bg-opacity-50":
            show,
        }
      )}
    >
      <div
        ref={modalRef}
        className={`flex items-center justify-center ${classNames({
          "animate-slide-in-right animate-modalIn": show,
          "animate-slide-out-right": !show,
        })}`}
      >
        {children}
      </div>
    </div>
  )
}

export default  Modal