import { useState, useEffect } from "react";
import { createPortal } from 'react-dom'

export function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root')
  const [element] = useState(document.createElement('div'))

  useEffect(() => {
    modalRoot.appendChild(element)

    return function cleanup() {
      modalRoot.removeChild(element)
    }
  }, [modalRoot, element])

  return createPortal(children, element)
}

export default Portal
