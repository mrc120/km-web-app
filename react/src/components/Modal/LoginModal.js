import React from "react";
import { Portal } from './Portal'
import { StyledModal } from './style'
import LoginForm from "../../Form/LoginForm"

import km_logo from '../../assets/img/logokmclear.png'

const renderModalHeader = () => {
  return (
    <>
      <img className="mt-2" src={km_logo} width="100px" />
      <h2 className="modal-title km-color mt-2">Zaloguj się</h2>
    </>
  )
}

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

export default LoginModal;