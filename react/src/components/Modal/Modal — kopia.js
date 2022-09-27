import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap'

import ErrorIcon from '@mui/icons-material/Error';

import { createPortal } from 'react-dom'
import { StyledModal } from './style'


// Creates a portal outside the DOM hierarchy
function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root') // A div with id=modal-root in the index.html
  const [element] = useState(document.createElement('div')) // Create a div element which will be mounted within modal-root

  // useEffect bible: https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    modalRoot.appendChild(element)

    // cleanup method to remove the appended child
    return function cleanup() {
      modalRoot.removeChild(element)
    }
  }, [modalRoot, element])

  return createPortal(children, element)
}

const renderHeader = () => {

  return(
      <div>HEADER</div>
  )
  }
  

const renderLogin = () => {

return(
    <div>LEGIA</div>
)
}


// A modal component which will be used by other components / pages
function LoginModal({ children, showModal, toggle }) {
  return (
    <Portal>
      {showModal && (
        <StyledModal.ModalWrapper onClick={toggle}>
    
          <StyledModal.ModalBody >
          {(renderLogin())}
          </StyledModal.ModalBody>
        </StyledModal.ModalWrapper>
      )}
    </Portal>
  )
}





export default LoginModal
