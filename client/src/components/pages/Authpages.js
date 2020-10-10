import React from "react";
import styled from "styled-components";
import { Signup, Signin } from "../Form_view";
import Figure from "../Figure";
import { Facebook, GooglePlus, Twitter } from "../icon";

const Main = styled.div`
  min-height: 100vh;
  @media (min-width: 700px) {
    padding: 2rem 0;
  }
  background: rgb(248, 248, 248);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background: white;
  border-radius: 1rem;
  justify-content: center;
  box-shadow: 0.3rem 0.3rem 0.5rem 0 rgb(200, 200, 200);
  flex-direction: ${props => (props.signinForm ? "column-reverse" : "column")};
  padding: 3rem 1rem;
`;
const FormContainer = styled.div`
  flex-grow: 1;
  padding-right: ${props => (!props.paddingLeft && "3rem") || "0"};
  padding-left: ${props => (props.paddingLeft && "3rem") || "0"};
`;
const FigureContainer = styled.div`
  width: 100%;
  max-width: 25rem;
  height: 33rem;
`;
const SocialIconContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  @media (min-width: 700px) {
    margin-top: 4rem;
  }
  span {
    margin-right: 1rem;
  }
`;
const FacebookIcon = styled(Facebook)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-right: 1rem;
`;
const TwitterIcon = styled(Twitter)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-right: 1rem;
`;
const GooglePlusIcon = styled(GooglePlus)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-right: 1rem;
`;
export function SignupPage(props) {
  return (
    <React.Fragment>
        <Main>
          <Flex>
            <FormContainer>
              <Signup dispatch={auth.dispatch}/>
            </FormContainer>
            <FigureContainer>
              <Figure
                imgsrc="https://konfinity-assets.s3.ap-south-1.amazonaws.com/quiz/signup-image.jpg"
                figWidth="100%"
                figHeight="105%"
                imgHeight="29rem"
                linktext="I am already member"
                link="/signin"
              />
            </FigureContainer>
          </Flex>
        </Main>
    </React.Fragment>
  );
}

export function SigninPage(props) {
  return (
    <React.Fragment>
        <Main>
          <Flex signinForm>
            <FigureContainer paddingRight>
              <Figure
                imgsrc="https://konfinity-assets.s3.ap-south-1.amazonaws.com/quiz/signup-image.jpg"
                figWidth="100%"
                figHeight="100%"
                imgHeight="29rem"
                linktext="Create an account"
                link='/signup'
              />
            </FigureContainer>
            <FormContainer paddingLeft signinForm>
              <Signin dispatch={auth.dispatch} />
              <SocialIconContainer>
                <span>Or begin with</span>
                <FacebookIcon />
                <TwitterIcon />
                <GooglePlusIcon />
              </SocialIconContainer>
            </FormContainer>
          </Flex>
        </Main>
    </React.Fragment>
  );
}
