import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  StyledCarouselWrapper,
  StyledCurrentImage,
  StyledIndicator,
} from "./style";
import { useParams } from "react-router-dom";
import placeholderImg from "/src/img/placeholder-image.png";
import { Theme, useTheme } from "@mui/material";

type CarouselProps = {
  photos?: string[];
};
export const CarouselImage: React.FC<CarouselProps> = ({ photos }) => {
  const { categoryName } = useParams();
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
  };
  const theme: Theme = useTheme();

  return (
    <StyledCarouselWrapper hidden={!photos?.length}>
      <Carousel
        autoPlay={false}
        navButtonsAlwaysInvisible
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
          ".css-1f8sh1y": {
            marginY: "auto",
          },
        }}
        indicatorContainerProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 24,
            height: "100%",
            marginRight: 16,
            width: "20%",
          },
        }}
        indicatorIconButtonProps={{
          style: {
            borderRadius: 12,
            border: `3px solid transparent`,
            overflow: "hidden",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            borderRadius: 12,
            border: `3px solid ${theme.palette.primary.main}`,
          },
        }}
        IndicatorIcon={photos?.map((src) => (
          <StyledIndicator
            src={error ? placeholderImg : src}
            onError={handleImageError}
          />
        ))}
      >
        {photos?.map((src) => (
          <StyledCurrentImage key={src}>
            <img id={`${categoryName}-${src.slice(-9, -4)}`} src={src} />
          </StyledCurrentImage>
        ))}
      </Carousel>
    </StyledCarouselWrapper>
  );
};
