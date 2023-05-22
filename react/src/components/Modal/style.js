import styled from 'styled-components'

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 111;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
 
`
const ContentB = styled.div`
border: 1px solid rgba(0,0,0,.2);
border-radius: 0.3rem;
background-color: #fefefe;
display: fixed;
left: 50%
width: 250px;
align-content:center;


`

const ModalHeader = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px
`

const ModalBody = styled.div`
  margin: auto;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 9999;
  padding: 2rem;
  border-radius: 1rem;
 
`;

const Backdrop = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`

const CloseButton = styled.button`
margin: 0 auto;
display: block;
    border: 0;
    font-size: 15px;
    font-weight: 400;
    color: black;
    background-color: transparent;
    opacity: 0.8;
    margin-top: 5px;
    &:hover,
  &:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
  }
`

export const StyledModal = {
  ModalWrapper,
  ModalHeader,
  ContentB,
  ModalBody,
  ModalOverlay,
  Backdrop,
  CloseButton
}
