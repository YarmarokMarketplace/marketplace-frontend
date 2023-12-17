import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { modalSelector } from './selector';
import { AppDispatch } from '../../store';
import { openModalAction } from './reducer';
import { ModalContent } from '../../types';

import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import { StyledIconButton, StyledBox } from './style';
import LogoutModal from '../ModalContent/LogoutModal';
import DeleteAccountModal from '../ModalContent/DeleteAccountModal';
import ConfirmPurchase from '../ModalContent/ConfirmPurchase';
import DeleteProductModal from '../ModalContent/DeleteProductModal';

const CustomModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const { open, content } = useSelector(modalSelector);

  const handleToggleModal = () => {
    dispatch(openModalAction(!open));
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleToggleModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <StyledBox>
          <StyledIconButton color='inherit' onClick={handleToggleModal}>
            <CloseIcon fontSize='medium' />
          </StyledIconButton>

          {content == ModalContent.logout && <LogoutModal />}
          {content == ModalContent.deleteAccount && <DeleteAccountModal />}
          {content == ModalContent.confirmPurchase && <ConfirmPurchase />}
          {content == ModalContent.deleteProduct && <DeleteProductModal />}
        </StyledBox>
      </Modal>
    </div>
  );
};

export default CustomModal;
