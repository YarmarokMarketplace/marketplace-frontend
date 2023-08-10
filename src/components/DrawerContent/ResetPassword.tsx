import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ResetPassword = () => {

    return (
        <Stack alignItems="center" >
            <Typography padding={2} color="primary.main" variant="h4">
                Відновлення паролю
            </Typography>
        </Stack >
    )
}

export default ResetPassword;