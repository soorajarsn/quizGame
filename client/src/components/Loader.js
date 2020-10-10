import React from 'react'
import styled, { keyframes } from 'styled-components';
const spin = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`
const LoaderContainer = styled.div`
    height: 100%;
    background: rgba(0, 0, 0, .4);
    top: 0;
    left: 0;
    position:absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    z-index:4;
`;
const Spinner = styled.div`
        border: .3rem solid transparent;
        border-radius: 100%;
        border-top: .3rem solid rgb(216,38,62);
        border-left:.3rem solid rgb(216,38,62);
        width: 4rem;
        height: 4rem;
        -webkit-animation: ${spin} .8s cubic-bezier(.3,.15,.15,.2) infinite;
        animation: ${spin} .8s cubic-bezier(.3,.15,.15,.2) infinite;
`


function Loader({fullPageLoader}) {
    return (
        <LoaderContainer>
            <Spinner />
        </LoaderContainer>
    )
}

export default Loader;