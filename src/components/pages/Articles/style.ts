import { Container, ListItem, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "61.5rem 19.5rem",
  gap: theme.spacing(4),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(8),
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  fontWeight: 500,
  "&.active": {
    color: theme.palette.primary.main,
    pointerEvents: "none",
    fontWeight: 700,
  },
  ":hover": {
    color: theme.palette.secondary.main,
  },
  "::before": {
    content: '"\\2022"',
    marginRight: "0.5rem",
  },
}));

export const StyledListContentItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.75rem",
  fontWeight: 500,
  display: "list-item",
  padding: theme.spacing(1),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
  fontWeight: 600,
  display: "list-item",
  padding: theme.spacing(1),
  paddingTop: theme.spacing(0),
  marginLeft: theme.spacing(3),
  width: "100%",
}));
