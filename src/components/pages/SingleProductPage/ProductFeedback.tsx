import { Stack, Box, Typography, Rating } from "@mui/material";
import React from "react";
import { StyledInfoBlock, StyledLink } from "./style";

interface FeedbackProp {
  data: {
    name: string;
    rate: number;
    date: string;
    feedback: string;
  };
}

export const ProductFeedback: React.FC<FeedbackProp> = ({ data }) => {
  return (
    <StyledInfoBlock>
      <Stack
        spacing={3}
        borderBottom="1px solid"
        borderColor="secondary.light"
        pb={3}
        mb={3}
      >
        <Box style={{ fontWeight: 700, fontSize: "1.125rem" }}>
          Відгуки про 
          <Typography
            variant="h6"
            color="divider"
            fontWeight={700}
            display="inline"
          >
            Ольга Малова
          </Typography>{" "}
        </Box>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body1" fontWeight={700}>
              {data.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Rating size="medium" readOnly value={data.rate} />
              <Typography color="divider" variant="caption">
                {data.date}
              </Typography>
            </Stack>
          </Box>
          <Typography variant="body1">{data.feedback}</Typography>
        </Stack>
      </Stack>
      <StyledLink id="feedback-link" to="/feedback">
        Показати ще відгуки
      </StyledLink>
    </StyledInfoBlock>
  );
};
