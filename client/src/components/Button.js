import React from 'react';
import styled from 'styled-components';
import { PRIMARY_COLOR,PRIMARY_COLOR_FADED } from './colors';
export const AccentButton = styled.button`
    width:9rem;
    padding:.5rem 0;
    border:2px solid ${PRIMARY_COLOR};
    color:white;
    font-weight:bold;
    background:${PRIMARY_COLOR};
    margin:1rem 0;
    font-size:1.1rem;
    border-radius:.2rem;
    cursor:pointer;
    display:${props => props.hidden ? "none" : "block"};
    &:hover{
        border:2px solid ${PRIMARY_COLOR_FADED};
        background:${PRIMARY_COLOR_FADED};
    }
    &:active{
        outline:none;
    }
`
export const OutlineButton = styled(AccentButton)`
    color:${PRIMARY_COLOR};
    background:white;
    &:hover{
        background:white;
        color:${PRIMARY_COLOR_FADED};
    }
`
export const LinkButton = styled(OutlineButton)`
    border:none;
    width:fit-content;
    padding:${props => props.padding || "0"};
    &:hover{
        border:none;
    }
`
export const Bookmark = styled(LinkButton)`
    color:grey;
    width:fit-content;
    height:100%;
    padding:0;
    margin:0;
`
export const BookmarkButton = (props) => <Bookmark {...props}><i className="far fa-bookmark"></i></Bookmark>