import React, { useState } from 'react';

import { Modal, IconButton, Stack, Button } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CloseIcon from '@mui/icons-material/Close';

import { StyledIconButton, StyledBox } from './style';
import { Typography } from '@mui/material';

interface CategoryFilterModalProps {
    openFilterModal: boolean;
    setOpenFilterModal: (value: boolean) => void;
}

const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({ children, openFilterModal, setOpenFilterModal }) => {
    const [open, setOpen] = useState(false);
    const handleToggleModal = () => {
        setOpenFilterModal(!openFilterModal);
    };
    return (
        <div>
            <Modal
                open={openFilterModal}
                onClose={handleToggleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledBox>
                    <Stack
                        direction='row'
                        alignItems='center'
                        mb='.625rem'
                    >
                        <IconButton color="inherit" onClick={handleToggleModal}>
                            <ArrowBackIosNewRoundedIcon fontSize="medium" color="disabled" />
                        </IconButton>
                        <Typography variant='h4' ml='1.25rem'>Фільтри</Typography>
                    </Stack>
                    {children}
                    <Stack
                        direction='row'
                        justifyContent='center'
                    >
                        <Button variant="contained"
                            sx={{
                                mt: '1.5rem',
                                width: '95%',
                            }}
                            onClick={handleToggleModal}>Показати оголошення</Button>
                    </Stack>
                </StyledBox>
            </Modal>
        </div>
    );
};

export default CategoryFilterModal;
