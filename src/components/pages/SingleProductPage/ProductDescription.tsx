import React from "react";
import { Tabs, Typography, Stack } from "@mui/material";
import { StyledDescBlock, StyledTab } from "./style";

type ProductDescriptionProps = {
  description: string;
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <Stack>
      <Tabs
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        textColor="primary"
        value="description"
      >
        <StyledTab
          value="description"
          className="textColorPrimary"
          label="Опис товару"
        />
      </Tabs>
      <StyledDescBlock>
        <Typography whiteSpace="break-spaces" variant="body1">
          {description}
        </Typography>
      </StyledDescBlock>
    </Stack>
  );
};
