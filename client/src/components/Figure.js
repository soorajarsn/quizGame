import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
const primaryColor = "rgb(216,62,38)";
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const ImgWrapper = styled.div`
  width: 100%;
  height: ${props => props.height};
  overflow: hidden;
`;
const FigureWrapper = styled.div`
  background: transparent;
  width:${props => props.width};
  height:${props => props.height};
  @media (max-width:500px){
      width:100%;
  }
  display:flex;
  flex-direction:column;
  align-items:center;
  position:relative;
  .link {
    color: ${primaryColor};
    position:absolute;
    bottom:1.5rem;
    text-decoration: underline;
    &:hover {
      color: rgba(216, 32, 68, 0.9);
    }
  }
`;
function Figure(props) {
  return <FigureWrapper height={props.figHeight} width={props.figWidth}>
      <ImgWrapper height={props.imgHeight}>
          <Image src={props.imgsrc} alt=""/>
      </ImgWrapper>
      <Link className="link" to={props.link}>{props.linktext}</Link>
  </FigureWrapper>;
}

export default Figure;