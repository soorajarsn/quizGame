import React from 'react';
import styled from 'styled-components';
import { SECONDARY_COLOR, PRIMARY_COLOR } from './colors';
export const Input = styled.input`
    padding:.5rem .5rem .5rem 1rem;
    font-size:1rem;
    width:100%;
    border-radius:.1rem;
    border:2px solid ${SECONDARY_COLOR};
    @media (min-width:700px){
        font-size:1.1rem;
    }
    @media (min-width:1000px){
        font-size:1.2rem;
    }
    &:placeholder{
        color:${SECONDARY_COLOR};
    }
    &:focus,&:active{
        outline:none;
        border: 2px solid ${PRIMARY_COLOR};
    }
`
export const FileInput = styled.input`
    position:absolute;
    padding:.8rem;
    opacity:0;
    width:8rem;
    cursor:pointer;
`
export const FileInputWrapper = styled.div`
    color:${PRIMARY_COLOR};
    position:relative;
    display:flex;
    align-items:center;
    font-weight:600;
    .button{
        border:2px solid ${PRIMARY_COLOR};
        color:${PRIMARY_COLOR};
        font-weight:600;
    }
    .text{
        margin-left:1rem;
    }
`
export const LabledIconInput = styled(Input)`
    border:none;
    padding:.5rem .1rem .5rem 2rem;
    border-bottom:2px solid ${SECONDARY_COLOR};
    &:focus,&:active{
        border:none;
        border-bottom:2px solid ${PRIMARY_COLOR};
    }
`
export const LabledIconInputWrapper = styled.div`
    position:relative;
    .icon{
        position:absolute;
        top:20%;
        left:0;
        font-size:1.2rem;
    }
    input:active+.icon,input:focus+.icon{
        color:${PRIMARY_COLOR};
    }
`
export const Checkbox = styled.input`
    opacity:0;
    width:1rem;
    position:absolute;
    cursor:pointer;
    z-index:1;
    height:1rem;
`
export const CheckboxWrapper = styled.div`
    position:relative;
    display:flex;
    padding:.5rem 0;
    align-items:center;
    .box{
        width:1rem;
        height:1rem;
        margin:0;
        display:flex;
        align-items:center;
        padding:0;
        border-radius:.1rem;
        border:1px solid ${SECONDARY_COLOR};
        outline:none;
        box-shadow:none;
        .icon{
            line-height:1.5rem;
            font-size:.8rem;
            color:white;
            display:none;
        }
    }
    input:checked+.box{
        background:${PRIMARY_COLOR};
        border:1px solid ${PRIMARY_COLOR};
        .icon{
            display:inline-block;
        }
    }
    label{
        font-size:1.1rem;
        color:#222;
        margin-left:1rem;
        @media (min-width:700px){
            font-size:1.15rem;
        }
        @media (min-width:1000px){
            font-size:1.2rem;
        }
        a{
            color:${PRIMARY_COLOR};
            text-decoration:underline;
            &:hover{
                color:rgba(216,32,68,.9);
            }
        }
    }
`
export function CheckboxInput(props){
    return (
        <CheckboxWrapper>
            <Checkbox name={props.name} type="checkbox"/>
            <div className="box">
                <i className="fas fa-check icon"></i>
            </div>
            <label>{props.children}</label>
        </CheckboxWrapper>
    )
}
export const RadioInputView = styled.input`
    position: absolute;
    top: 0;
    height: 100%;
    z-index:2;
    opacity:0;
    width: 100%;
`