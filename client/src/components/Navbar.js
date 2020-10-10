import React from "react";
import styled from "styled-components";
import logo from "./assets/logo.jpg";
import { AccentButton, OutlineButton } from "./Button";
import { Link } from "react-router-dom";
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
  return (
    <IndexNavContainer>
      <IndexNav>
        <LogoContainer>
          <Logo src={logo} alt="" />
        </LogoContainer>
        <ButtonGroup>
          <Link to="/signin">
            <AccentButton>Login</AccentButton>
          </Link>
          <Link to="/signup">
            <OutlineButton>Register</OutlineButton>
          </Link>
        </ButtonGroup>
      </IndexNav>
    </IndexNavContainer>
  );
};
