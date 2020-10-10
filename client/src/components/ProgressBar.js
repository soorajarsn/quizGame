import React from "react";
import styled from "styled-components";
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  font-size: 0.9rem;
  @media (min-width: 375px) {
    font-size: 1rem;
  }
  @media (min-width: 700px) {
    font-size: 1.1rem;
  }
  margin-right: ${props => (props.marginRight && ".5rem") || "0"};
  margin-left: ${props => (props.marginLeft && ".5rem") || "0"};
`;
const ProgressBar = styled.div`
  width: 7rem;
  @media (min-width: 310px) {
    width: 9rem;
  }
  @media (min-width: 360px) {
    width: 13rem;
  }
  @media (min-width: 420px) {
    width: 15rem;
  }
  height: 0.5rem;
  position: relative;
  background: #dbdbdb;
  border-radius: 0.2rem;
`;
const ProgressStatus = styled.div.attrs(props => ({
  style: {
    width: props.status >= 1 ? "100%" : (props.status * 100 || 0) + "%",
  },
}))`
  height: 0.5rem;
  position: absolute;
  border-radius: 0.2rem;
  background: #a7a7a7;
`;
export default function (props) {
  const { currentValue, maxValue } = props;
  let completed, max;
  if (props.timer) {
    let minSec = currentValue.split(":");
    let min = parseInt(minSec[0]);
    let sec = parseInt(minSec[1]);
    completed = min * 60 + sec;
    max = parseInt(maxValue.substring(0, 2)) * 60 + parseInt(maxValue.substring(3));
  } else {
    completed = parseInt(currentValue);
    max = parseInt(maxValue);
  }
  return (
    <Flex>
      <Label marginRight>{props.label}:</Label>
      <ProgressBar>
        <ProgressStatus status={completed / max}></ProgressStatus>
      </ProgressBar>
      <Label marginLeft>
        {currentValue}/{maxValue}
      </Label>
    </Flex>
  );
}
