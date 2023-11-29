import React from "react";
import { Portal } from './Portal'
import { StyledModal } from './style'

import EditModalForm from './../../Form/EditModalForm'

const renderModalHeader = () => (
  <h2 className="modal-title km-color ">Edytowanie</h2>
)

function EditModal({ showModal, toggle, id, title, description }) {
  return (
    <Portal>
      {showModal && (
        <StyledModal.Backdrop>
          <StyledModal.ModalOverlay onClick={event => event.stopPropagation()}>
            <StyledModal.ModalHeader>
              {(renderModalHeader())}
            </StyledModal.ModalHeader>
            <StyledModal.ModalBody >
              <EditModalForm
                id={id}
                title={title}
                description={description}
                onClick={toggle} />
            </StyledModal.ModalBody>
            <StyledModal.CloseButton onClick={toggle}>
              <p className="btn btn-danger btn-fill mt-0 mb-0">Anuluj</p>
            </StyledModal.CloseButton>
          </StyledModal.ModalOverlay>
        </StyledModal.Backdrop >
      )}
    </Portal>
  )
}

export default EditModal
