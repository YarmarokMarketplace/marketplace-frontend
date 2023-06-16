import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Header from "../Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const App: React.FC = () => {
  console.log("Hello world");
  return (
    <>
      <Header />
    </>
    // <Box sx={{ width: '100%' }}>
    //   <Stack spacing={2}>
    //     <Item>Item 1</Item>
    //     <Item>Item 2</Item>
    //     <Item>Item 3</Item>
    //   </Stack>
    // </Box>
  );
};

export default App;
