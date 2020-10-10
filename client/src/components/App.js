import React from "react";
import { BookmarkButton, AccentButton, OutlineButton, LinkButton } from "./Button";
import Figure from "./Figure";
import { RadioInput } from "./Input";
import { RadioInputView, Input, FileInput, FileInputWrapper, CheckboxInput } from "./Input_view";
import { BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import Paragraph from './Paragraph';
const TitleWrapper = styled.section`
  padding: 1rem 2rem;
  padding-left: 0;
  margin: 0 1rem;
  background: white;
  border-bottom: 0.4rem solid rgb(230, 230, 230);
  border-radius: 0.2rem;
`;
const ProgressBarWrapper = styled.div`
  margin: 1rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ButtonWrapper = styled.div`
  margin: 0 1rem;
  display: grid;
  grid-template-columns: 10rem 10rem 9rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
const Wrapper = styled.div`
  padding: ${props => (props.pTop || 0) + " " + (props.pRight || 0) + " " + (props.pBottom || 0) + " " + (props.pLeft || 0)};
  margin: ${props => (props.mTop || 0) + " " + (props.mRight || 0) + " " + (props.mBottom || 0) + " " + (props.mLeft || 0)};
`;
function App() {
  return (
    <Router>
      <div>
        <ButtonWrapper>
    <AccentButton>Next</AccentButton>
    <OutlineButton>Previous</OutlineButton>
    <LinkButton>Need Help?</LinkButton>
    <BookmarkButton />
  </ButtonWrapper>
  <Wrapper mLeft="1rem" mRight="1rem" mTop="1rem" mBottom="1rem">
    <Paragraph>Which module can create an HTTP server that listens to server ports and gives a responce back to the client?</Paragraph>
  </Wrapper>
  <Wrapper mLeft="1rem" mRight="1rem">
    <Input  value="value" name="something" />
    <CheckboxInput name="checkboxInput">
      I agree all statements in <a>Terms of services</a>
    </CheckboxInput>
  </Wrapper>
  <Wrapper mLeft="1rem" mTop="1rem">
    <FileInputWrapper>
      <button className="button">Browse File</button>
      <div className="text">No File Choosen</div>
      <FileInput type="file" />
    </FileInputWrapper>
  </Wrapper>
  <Wrapper mLeft="1rem" mTop="1rem" mRight="1rem">
    <Figure
      imgsrc="https://konfinity-assets.s3.ap-south-1.amazonaws.com/quiz/signup-image.jpg"
      figWidth="20rem"
      figHeight="30rem"
      imgHeight="26rem"
      linktext="I am already member"
      link='/signin'
    />
  </Wrapper>
      </div>
    </Router>
  );
}

export default App;
