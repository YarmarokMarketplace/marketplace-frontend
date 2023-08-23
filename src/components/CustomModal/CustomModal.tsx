import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { modalSelector } from "./selector";
import { AppDispatch } from "../../store";
import { openModalAction } from "./reducer";
import { ModalContent } from "../../types";

import Modal from '@mui/material/Modal';
import CloseIcon from "@mui/icons-material/Close";

import { StyledIconButton, StyledBox } from './style';

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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledBox>
                    <StyledIconButton
                        color="inherit"
                        onClick={handleToggleModal}
                    >
                        <CloseIcon fontSize="medium" />
                    </StyledIconButton>

                    {/* {content == ModalContent.exitProfile && <Exit />} */}

                </StyledBox>
            </Modal>
        </div>
    );
}

export default CustomModal;