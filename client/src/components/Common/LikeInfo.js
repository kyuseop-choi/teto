import { ReactComponent as LikeImg } from "assets/like.svg";
import React from "react";
import styled from "styled-components";
import { PALLETE } from "constants/pallete";

const LikeInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LikeInfo = ({ likes }) => {
  return (
    <LikeInfoContainer className="likeInfo">
      <LikeImg width={15} height={15} fill={PALLETE.RED} />
      <span>&nbsp;{likes}</span>
    </LikeInfoContainer>
  );
};

export default LikeInfo;
