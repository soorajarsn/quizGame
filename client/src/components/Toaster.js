import React, { useEffect } from "react";
import styled,{keyframes} from "styled-components";
const getInFromRight = keyframes`
    from {
        transform: translateX(105%);
    }

    to {
        transform: translateX(0);
    }
`;
const getInFromTop = keyframes`
    from{
        transform: translateY(-100%);
    }
    to{
        transform:translateY(.1rem);
    }
`
const shiftToRight = keyframes`
    0%{
        transform:translateX(1rem);
    }
    50%{
        transform:translateX(.9rem);
    }
    80%{
        transform:translateX(.8rem);
    }
    90%{
        transform:translateX(.7rem);
    }
    100%{
        transform:translateX(0);
    }
`
const ToasterContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  overflow: hidden;
  border-radius: 0.3rem;
  @media (min-width: 1000px) {
    width: 20rem;
    top: 6rem;
    right:1rem;
    -webkit-animation: ${shiftToRight} .5s cubic-bezier(.3,.15,.15,.2) forwards;
    animation: ${shiftToRight} .5s cubic-bezier(.3,.15,.15,.2) forwards;
  }
`;
const Toaster = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.3rem .5rem;
  border-radius: 0.3rem;
  color: white;
  display:flex;
  align-items:center;
  -webkit-animation: ${getInFromTop} .2s cubic-bezier(.3,.15,.15,.2) forwards;
    animation: ${getInFromTop} .2s cubic-bezier(.3,.15,.15,.2) forwards;
  @media (min-width:1000px){
    -webkit-animation: ${getInFromRight} .5s cubic-bezier(.3,.15,.15,.2) forwards;
    animation: ${getInFromRight} .5s cubic-bezier(.3,.15,.15,.2) forwards;
  }
`;
const ToasterIcon = styled.div`
  border-radius: 100%;
  background: white;
  margin-right: 0.25rem;
  font-size:1.4rem;
  width:2.2rem;
  height:2.2rem;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const ToasterContent = styled.div`
    margin-left:.25rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
`
const ToasterHeader = styled.h2`
  font-weight: bold;
  font-size: 1rem;
  @media (min-width: 1000px) {
    font-size: 1.1rem;
  }
`;
const ToasterText = styled.p`
  font-size: 0.9rem;
  @media (min-width: 1000px) {
    font-size: 1rem;
  }
`;
const ToasterSuccess = styled(Toaster)`
  background: green;
  ${ToasterIcon} {
    color: green;
  }
`;
const ToasterFailure = styled(Toaster)`
  background: red;
  ${ToasterIcon} {
    color: red;
  }
`;
const ToasterWarning = styled(Toaster)`
  background: #7579e7;
  ${ToasterIcon} {
    color: #7579e7;
  }
`;
export const ToasterComponent = props => {
  useEffect(()=>{
    setTimeout(()=>{
      document.getElementById('info-portal').innerHTML = "";
    },1000*5);
  },[])
  return (
    <ToasterContainer>
      {props.success && (
        <ToasterSuccess>
          <ToasterIcon>
            <i className="fas fa-check" />
          </ToasterIcon>
          <ToasterContent>
                <ToasterHeader>Success:</ToasterHeader>
                <ToasterText>{props.text}</ToasterText>
          </ToasterContent>
        </ToasterSuccess>
      )}
      {props.failure && (
        <ToasterFailure>
          <ToasterIcon>
            <i className="fas fa-times" />
          </ToasterIcon>
          <ToasterContent>
                <ToasterHeader>Failure:</ToasterHeader>
                <ToasterText>{props.text}</ToasterText>
          </ToasterContent>
        </ToasterFailure>
      )}
      {props.warning && (
        <ToasterWarning>
          <ToasterIcon>
            <i className="fas fa-exclamation"></i>
          </ToasterIcon>
          <ToasterContent>
                <ToasterHeader>Info:</ToasterHeader>
                <ToasterText>{props.text}</ToasterText>
          </ToasterContent>
        </ToasterWarning>
      )}
    </ToasterContainer>
  );
};
