import { Stack, Box, Typography, Rating } from "@mui/material";
import React from "react";
import { StyledInfoBlock, StyledLink } from "./style";

const feedback = [
  {
    name: "РИНАТ К.",
    date: "30.03.23",
    rate: 4,
    feedback: "Рекомендую продавця хороші товари 👍",
  },
  {
    name: "РИНАТ К.",
    date: "30.03.23",
    rate: 2,
    feedback:
      "Працює тільки від акумулятора, а писали що й від мережі може. Недостовірна інформація. Це про машинку для стрижки.",
  },
  {
    name: "РИНАТ К.",
    date: "30.03.23",
    rate: 3,
    feedback: "Рекомендую продавця хороші товари 👍",
  },
];

type FeedBackProp = {
  seller: string;
};

export const ProductFeedback: React.FC<FeedBackProp> = ({ seller }) => {
  return (
    <StyledInfoBlock sx={{ height: "fit-content" }}>
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
            {seller}
          </Typography>{" "}
        </Box>
        {feedback.map((data, index) => {
          return (
            <Stack key={index} spacing={2}>
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
          );
        })}
      </Stack>
      <StyledLink id="feedback-link" to="/feedback">
        Показати ще відгуки
      </StyledLink>
    </StyledInfoBlock>
  );
};
