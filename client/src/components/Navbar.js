import React, { useContext } from "react";
import styled from "styled-components";
import logo from "./assets/logo.jpg";
import { LinkButton, AccentButton, OutlineButton } from "./Button";
import { Link } from "react-router-dom";
import SubTitle from "./SubTitle";
import { Title } from "./Title";
import ProgressBar from "./ProgressBar";
import { AuthContext } from "../state/Store";
import { logOut } from "../state/auth/authActions";

const IndexNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  position: relative;
`;
const IndexNav = styled.nav`
  display: flex;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 1600px;
  @media (max-width: 699px) {
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
  }
`;
const LogoContainer = styled.div`
  height: 4rem;
  width: 9rem;
`;
const Logo = styled.img`
  height: 100%;
  width: 100%;
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${AccentButton} {
    margin-right: 0.5rem;
  }
  ${OutlineButton} {
    margin-left: 0.5rem;
  }
  @media (max-width: 699px) {
    display: none;
  }
`;
export const IndexNavbar = props => {
  const auth = useContext(AuthContext);
  return (
    <IndexNavContainer>
      <IndexNav>
        <LogoContainer>
          <Logo src={logo} alt="" />
        </LogoContainer>
        {!auth.state.userLoggedIn ? (
          <ButtonGroup>
            <Link to="/signin">
              <AccentButton>Login</AccentButton>
            </Link>
            <Link to="/signup">
              <OutlineButton>Register</OutlineButton>
            </Link>
          </ButtonGroup>
        ):
        <ButtonGroup>
          <AccentButton onClick={()=>auth.dispatch(logOut())}>Logout</AccentButton>
        </ButtonGroup>
        }
      </IndexNav>
    </IndexNavContainer>
  );
};
const NavContainer = styled.div`
  height: 4.5rem;
  padding: 0 1rem;
  @media (min-width: 700px) {
    height: 5rem;
    padding: 0 2rem;
  }
  @media (min-width: 1000px) {
    height: 6rem;
  }
  @media (min-width: 1200px) {
    padding: 0 3rem;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProgressBarWrapper = styled.div`
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media (max-width: 999px) {
    display: ${props => (props.desktop && "none") || "flex"};
    padding: 1rem 0;
    margin-left: 2rem;
  }
  @media (max-width: 700px) {
    margin-left: 1rem;
  }
  @media (min-width: 1000px) {
    display: ${props => (!props.desktop && "none") || "flex"};
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    ${AccentButton},${LinkButton} {
      display: none;
    }
  }
`;
const UserWrapper = styled.div`
  margin: 0 0 0 1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  height: 2.3rem;
  border: 2px solid rgb(216, 62, 38);
  position: relative;
`;
const Popover = styled.div`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 2.3rem;
  right: 0;
  background: rgb(216, 62, 38);
  color: white;
  cursor: pointer;
  padding: 0.2rem 1rem;
  transform: translateY(2rem);
  transition: transform 0.2s;
  &[aria-hidden="false"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;
export function Navbar(props) {
  const auth = useContext(AuthContext);
  let { min, sec } = props;

  function getTimeString(min, sec) {
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    return min + ":" + sec;
  }

  let currentTimeString = getTimeString(min, sec);

  function showPopover() {
    const ariaHidden = document.querySelector(".profile-popover").getAttribute("aria-hidden");
    if (ariaHidden == "true") document.querySelector(".profile-popover").setAttribute("aria-hidden", "false");
    else document.querySelector(".profile-popover").setAttribute("aria-hidden", "true");
  }

  return (
    <React.Fragment>
      <NavContainer>
        <div>
          <Title>{props.title}</Title>
          <SubTitle>Instruction</SubTitle>
        </div>
        <ProgressBarWrapper desktop>
          <ProgressBar label="Time" currentValue={currentTimeString} maxValue={props.maxTime} timer />
          <ProgressBar label="Ques" currentValue={props.questions} maxValue={props.totalNumberOfQuestions} />
        </ProgressBarWrapper>
        <ButtonContainer>
          <LinkButton padding=".5rem">Need Help?</LinkButton>
          <AccentButton aria-controls="submit" onClick={props.handleSubmit}>
            Submit Test
          </AccentButton>
          <UserWrapper onClick={showPopover}>
            <span>{auth.state.userName || "Sooraj Shukla"}</span>
            <Popover className="profile-popover" aria-hidden="true">
              <span onClick={() => auth.dispatch(logOut())}>Logout</span>
            </Popover>
          </UserWrapper>
        </ButtonContainer>
      </NavContainer>
      <ProgressBarWrapper>
        <ProgressBar label="Time" currentValue={currentTimeString} maxValue={props.maxTime} timer />
        <ProgressBar label="Ques" currentValue={props.questions} maxValue={props.totalNumberOfQuestions} />
      </ProgressBarWrapper>
    </React.Fragment>
  );
}
