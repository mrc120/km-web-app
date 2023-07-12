import React from "react";
import { Portal } from "./Portal"
import FilesService_podst from "../../services/Files/files_podst.service"

import ErrorIcon from '@mui/icons-material/Error';
import { Box } from "@mui/material";
import { StyledModal } from './style'


const deleteFile = (id) => {
  FilesService_podst.remove(id)
    .then(response => {
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  window.location.reload(true);
}

const renderModalHeader = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ErrorIcon sx={{ color: "#FF4A55", fontSize: "120px !important" }} />
      <p className="d-flex flex-column align-items-center modal-title h2 justify-content-center ml-0">Jesteś pewien?</p>
    </div>
  )
}

const renderModalBody = (title) => (
  <>
    <p className="d-flex justify-content-center mb-1 ">Próbujesz usunąć pozycję o nazwie:</p>
    <p className="font-weight-bold d-flex justify-content-center mb-4">{title}</p>
  </>
)

const renderModalFooter = (id) => (
  <>
    <Box className="d-flex justify-content-center" >
      <p className="btn btn-secondary btn-fill mr-5"
      >Anuluj</p>
      <p className="btn btn-danger btn-fill ml-5"
        onClick={() => deleteFile(id)}
      >Tak, usuń</p>
    </Box>
  </>
)

function DeleteModal({ showModal, toggle, id, title }) {
  return (
    <Portal>
      {showModal && (
        <StyledModal.Backdrop >
          <StyledModal.ModalOverlay onClick={toggle} >
            <StyledModal.ModalHeader>
              {(renderModalHeader())}
            </StyledModal.ModalHeader>
            <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
              {(renderModalBody(title))}
            </StyledModal.ModalBody>
            <StyledModal.ModalFooter>
              {(renderModalFooter(id))}
            </StyledModal.ModalFooter>
          </StyledModal.ModalOverlay>
        </StyledModal.Backdrop >
      )}
    </Portal>
  )
}

export default DeleteModal
