import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(920deg);
  }
`;

const SpinnerStyle = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
  color: #b48ead;
`;

const SpinnerBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export function Spinner() {
  return (
    <SpinnerBlock>
      <SpinnerStyle>Loading👍</SpinnerStyle>
    </SpinnerBlock>
  );
}
