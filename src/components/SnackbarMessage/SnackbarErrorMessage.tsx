import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { errorMessageToggleAction } from 'redux/auth/reducer';
import { statusMessagesSelector } from 'redux/auth/selector';

import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarErrorMessage: React.FC = ({ children }) => {
    const dispatch: AppDispatch = useDispatch();
    const { errorMessage } = useSelector(statusMessagesSelector);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(errorMessageToggleAction(false));
    };

    return (
        <Snackbar open={errorMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {children}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarErrorMessage;