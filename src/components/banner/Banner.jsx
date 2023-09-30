import React from "react";
import styled from "@emotion/styled";

const BannerContainer = styled.div`
  transition: opacity 1s ease-in-out;
  &.fade-out {
    opacity: 0;
  }
  &.fade-in {
    opacity: 1;
  }
`;

const Banner = (props) => {
    if (!props.bann) return null;
    const bann = props.bann.data;
    return (
        <BannerContainer name="banner" className={props.className} onTransitionEnd={props.onTransitionEnd}>
            <img src={bann.main_image.url} alt="logo" width={200}></img>
            <h4>{bann.title}</h4>
            <span>{bann.description[0].text}</span>
        </BannerContainer>
    );
};

export default Banner;