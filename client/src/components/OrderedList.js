import styled from 'styled-components';

export const OrderedList = styled.ol`
    padding:${props => props.type === "A" ? "0" : "0 0 0 1.2rem"};
    list-style-type:${props => props.type === "A" ? "upper-alpha" : "decimal"};
`