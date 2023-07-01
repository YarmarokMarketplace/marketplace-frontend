import { Box, Link, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: "#0F192E;",
  padding: theme.spacing(5, 7),
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#FFF",
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
}));

export const LogoContainer = styled(Box)({
  maxWidth: "20%",
});

export const Logo = styled("img")({
  maxWidth: "100%",
});

export const LinksContainer = styled(Box)(({ theme }) => ({
  maxWidth: "85%",
  display: "flex",
  gap: theme.spacing(3),
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  display: "block",
  textDecoration: "none",
  fontSize: ".9rem",
}));

export const Text = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: "100%",
  textAlign: "center",
  color: "#fff",
}));
