import React from 'react';
import styled from 'styled-components';

const SubTitle = styled.p`
color:rgb(216, 38, 62);
font-size:1.2rem;
@media (min-width:700px){
    font-size:1.3rem;
}
@media (min-width:1000px){
    font-size:1.4rem;
}
`
export default function(props){
    return <SubTitle>{props.children}</SubTitle>
}