import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom'
import { StyledModal } from './style'

import LoginForm from "../../Form/LoginForm"

import km_logo from '../../assets/img/logokmclear.png'

function Portal({ children }) {
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

const renderModalHeader = () => {
  return (
    <>
      <img className="mt-2" src={km_logo} width="100px" />
      <h2 className="modal-title km-color mt-2">Zaloguj się</h2>
    </>
  )
}

// A modal component which will be used by other components / pages
function LoginModal({ children, showModal, toggle }) {
  return (
    <Portal>
      {showModal && (
        <StyledModal.Backdrop >
          <StyledModal.ModalOverlay onClick={toggle} >
            <StyledModal.ModalHeader>
              {(renderModalHeader())}
            </StyledModal.ModalHeader>
            <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
              <LoginForm />
              <StyledModal.CloseButton onClick={toggle}>
                Zamknij
              </StyledModal.CloseButton>
              {children}
            </StyledModal.ModalBody>
          </StyledModal.ModalOverlay>
        </StyledModal.Backdrop >
      )}
    </Portal>
  )
}

export default LoginModal
