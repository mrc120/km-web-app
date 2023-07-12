import React, { useState } from "react";
import FilesService_podst from "../../services/Files/files_podst.service"
import { Portal } from './Portal'
import { StyledModal } from './style'
import { Row, Form } from 'react-bootstrap'
import Message from '../../utils/Message'
import EditModalForm from './../../Form/EditModalForm'

const renderModalHeader = () => (
    <h2 className="modal-title km-color ">Edytowanie</h2>
)

const showMessage = message => (
  message ? <Message msg={message} /> : null
)



const updateFile = (event, selectedItem, setMessage) => {
  event.preventDefault();
  FilesService_podst.update(selectedItem.id, selectedItem)
    .then(() => {
      setMessage("Zaaktualizowano pozycję, za chwilę nastąpi przekierowanie...")
      setTimeout(() => window.location.reload(true), 2000);
    }).catch(e => {
      console.log(e);
    })
}


function EditModal({
  children,
  showModal,
  toggle,
  id,
  title,
  description }) {

  const [message, setMessage] = useState("");

  const [selectedItem, setSelectedItem] = useState({
    id: id,
    title: title,
    description: description,
  })

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  }
  return (
    <Portal>
      {showModal && (
        <StyledModal.Backdrop >
          <StyledModal.ModalOverlay onClick={toggle} >
            <StyledModal.ModalHeader>
              {(renderModalHeader())}
            </StyledModal.ModalHeader>
            <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
              {/* <EditModalForm
                id={id}
                title={title}
                description={description} />
              <h2 className="d-flex-inline modal-title km-color mt-2">test id: {id}, desc: {description}, title: {title}</h2> */}
              <Form>
                <Row md="1" className="Row-fix2 ">
                  {showMessage(message)}
                  <h5>Nazwa dokumentu:</h5>
                  <Form.Control
                    type="text"
                    data-id={id}
                    id="title"
                    name="title"
                    value={selectedItem.title}
                    onChange={handleInputChange}
                  >
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Wprowadź tytuł dokumentu
                  </Form.Control.Feedback>
                </Row>
                <Row md="1" className="Row-fix mt-4 pb-0">
                  <h5 htmlFor="description">Opis dokumentu: </h5>
                  <Form.Control as='textarea' rows={3}
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                    value={selectedItem.description}
                    maxLength="200"
                    type="text"
                  />
                  <Form.Control.Feedback type="invalid">
                    Wprowadź opis dokumentu
                  </Form.Control.Feedback>
                </Row>
                {/* <p className="text-muted ml-4 p-1">Dopuszczalna ilość znaków: {characterCount}/200</p> */}
                <div className="mt-3 mb-3">
                  {/* <Progress percentage={uploadPercentage} /> */}
                  <input
                    type='submit'
                    onClick={updateFile}
                    className='btn btn-fill btn-primary btn-fix' />
                  <div className="d-flex justify-content-center mt-1">
                    {/* <p className="btn w-25 btn-danger btn-fill " >Anuluj</p> */}
                  </div>
                </div>
              </Form>
              <StyledModal.CloseButton onClick={toggle}>
                <p className="btn btn-danger btn-fill">Anuluj</p>
              </StyledModal.CloseButton>
              {children}
            </StyledModal.ModalBody>
          </StyledModal.ModalOverlay>
        </StyledModal.Backdrop >
      )}
    </Portal>
  )
}

export default EditModal
