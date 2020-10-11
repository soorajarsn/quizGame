import React, { useContext, useState } from "react";
import {loginUser,signupUser} from '../state/auth/authActions';
import styled from "styled-components";
import { useLabledIconInput } from "./Input";
import { CheckboxInput } from "./Input_view";
import {AccentButton} from './Button';
import {Title } from './Title';
import { InfoContext } from "../state/Store";
import { generateError } from "../state/info/infoActions";
const Form = styled.form`
  padding: 0;
  margin: 0;
  width: 100%;
  background:transparent;
`;
const FormField = styled.div`
  margin: 3rem 0;
`;
const ButtonContainer = styled.div`
    margin:1rem 0;
`
export function Signup(props) {
  const info = useContext(InfoContext);
  const [name, nameInput] = useLabledIconInput({ type: "text", name: "signup_name", placeholder: "Your name", icon: "fa-user" });
  const [email, emailInput] = useLabledIconInput({ type: "email", name: "signup_email", placeholder: "Your Email", icon: "fa-envelope" });
  const [password, passwordInput] = useLabledIconInput({ type: "password", name: "signup_password", placeholder: "Password", icon: "fa-lock" });
  const [repeatedPassword, repeatPasswordInput] = useLabledIconInput({ type: "password", name: "signup_repeatPassword", placeholder: "Repeat your password", icon: "fa-lock" });
  const [agreeToTerms,setAgreeToTerms] = useState(false);
  function handleSubmit(e) {
    if(name && email && password && repeatedPassword && agreeToTerms){
      if(password === repeatedPassword)
        signupUser(props.dispatch,{name,email,password,repeatedPassword});
      else{
        info.dispatch(generateError('Passwords do not match!'));
      }
    }
    else if(!name || !email || !password || !repeatedPassword){
      info.dispatch(generateError('Please fill in all the fields'));
    }
    else
      info.dispatch(generateError('You need to agree to terms and conditions'));
    e.preventDefault();
  }
  const toggleAgreeToTerms = (event) => {
    setAgreeToTerms(prev=>!prev);
  }
  return (
    <Form onSubmit={handleSubmit}>
        <Title>Sign up</Title>
      <FormField>{nameInput}</FormField>
      <FormField>{emailInput}</FormField>
      <FormField>{passwordInput}</FormField>
      <FormField>{repeatPasswordInput}</FormField>
      <CheckboxInput name="signup_term" value={agreeToTerms} onChange={toggleAgreeToTerms}>
        I agree all statements in <a>Terms of service</a>
      </CheckboxInput>
      <ButtonContainer>
        <AccentButton>Register</AccentButton>
      </ButtonContainer>
    </Form>
  );
}
export function Signin(props) {
  const [email, emailInput] = useLabledIconInput({ type: "email", name: "signin_email", placeholder: "Your Email", icon: "fa-envelope" });
  const [password, passwordInput] = useLabledIconInput({ type: "password", name: "signin_email", placeholder: "Password", icon: "fa-lock" });
  const info = useContext(InfoContext);
  function handleSubmit(e) {
    if(email && password){
        loginUser(props.dispatch,{email,password});
    }
    else{
      info.dispatch(generateError('Please fill in all the fields'));
    }
    event.preventDefault();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Title>Sign in</Title>
      <FormField>{emailInput}</FormField>
      <FormField>{passwordInput}</FormField>
      <CheckboxInput name="signup_term">
        Remember Password
      </CheckboxInput>
      <ButtonContainer>
        <AccentButton>Login</AccentButton>
      </ButtonContainer>
    </Form>
  );
}
