import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { successMessageToggleAction } from 'redux/auth/reducer';
import { statusMessagesSelector } from 'redux/auth/selector';

import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SuccessMessageContent } from 'src/types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarSuccessMessage: React.FC = ({ children }) => {
    const dispatch: AppDispatch = useDispatch();
    const { successMessage, succMsgContent } = useSelector(statusMessagesSelector);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(successMessageToggleAction(false));
    };

    return (
        <Snackbar open={successMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {succMsgContent == SuccessMessageContent.updateUserSuccess && 'Дані успішно збережено!'}
                {succMsgContent == SuccessMessageContent.deleteAccountSuccess && 'Ваш акаунт видалено!'}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarSuccessMessage;