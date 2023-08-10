import React from "react";
import { Breadcrumbs, useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Theme } from "@mui/material/styles";
import { StyledLink } from "./style";

const BasicBreadcrumbs: React.FC = ({ children }) => {
  const theme: Theme = useTheme();

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" color="primary" />}
      aria-label="breadcrumb"
      sx={{ padding: theme.spacing(0, 0, 3) }}
    >
      <StyledLink to="/">Головна</StyledLink>
      {children}
    </Breadcrumbs>
  );
};

export default BasicBreadcrumbs;
