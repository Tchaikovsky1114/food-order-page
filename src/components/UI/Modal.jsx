import styled from '@emotion/styled';
import React from 'react';
import ReactDom from 'react-dom'
import { Children } from 'react/cjs/react.production.min';




const BackdropWrapper = styled.div`

position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);

`

const ModalWrapper = styled.div`

  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  @media (min-width: 768px) {
  .modal {
    width: 40rem;
    left: calc(50% - 20rem);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

`

const Backdrop = props => {
  return <BackdropWrapper />
}

const ModalOverlay = ({children}) => {
  return <ModalWrapper>
    <div>{children}</div>
  </ModalWrapper>
}

const portalEl = document.getElementById('overlays')

const Modal = ({children}) => {
  return (
    <>
    {ReactDom.createPortal(<Backdrop />,portalEl)}
    {ReactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>,portalEl)}
    </>
  );
};

export default Modal;