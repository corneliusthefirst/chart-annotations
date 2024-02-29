import React, {
  useEffect,
  useCallback,
  ComponentPropsWithoutRef,
  useMemo,
  useRef,
} from "react"
import classNames from "classnames"

interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const closeOnEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && show) {
        onClose()
      }
    },
    [show, onClose]
  )

  const closeOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape, true)
    document.addEventListener("mousedown", closeOnOutsideClick)

    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.removeEventListener("mousedown", closeOnOutsideClick)
    }
  }, [closeOnEscape, closeOnOutsideClick])

  const bodyClass = useMemo(
    () =>
      classNames(
        `fixed h-full w-full top-0 left-0 z-50 flex items-center justify-center`,
        {
          "opacity-0 pointer-events-none animate-slide-out-right": !show,
          "overflow-x-hidden overflow-y-visible animate-modalIn animate-slide-in-right bg-gray-900 bg-opacity-50":
            show,
        }
      ),
    [show]
  )

  return (
    <div className={bodyClass}>
      <div ref={modalRef} className={`flex items-center justify-center`}>
        {children}
      </div>
    </div>
  )
}
