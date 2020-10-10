import React, { useState } from "react";
import { Input, LabledIconInput,LabledIconInputWrapper,RadioInputView } from "./Input_view";
export const useInput = props => {
  const [value, setValue] = useState("");
  const input = <Input value={value} onChange={e => setValue(e.target.value)} type={props.type} placeholder={props.placeholder} name={props.name} autoComplete="off" />;
  return [value, input];
};
export const useLabledIconInput = props => {
  const [value, setValue] = useState("");
  const input = <LabledIconInputWrapper>
      <LabledIconInput value={value} onChange={e => setValue(e.target.value)} type={props.type} placeholder={props.placeholder} name={props.name} autoComplete="off"/>
      <i className={"fas icon "+props.icon}></i>
  </LabledIconInputWrapper>
  return [value, input];
};

export const RadioInput = props => {
  const handleChange = (e) => {
    const {name,value} = e.target;
    props.setAns(name,value);
  } 
  return <RadioInputView type="radio" name={props.name} value={props.value} onChange={handleChange} />
}