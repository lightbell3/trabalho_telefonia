import styled from "styled-components";

export const Container = styled.button`
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: #fff;
    color: var(--blue);
    border:1px solid var(--blue);
    font-size:1rem;
    margin-top: 1.5rem;

    &:hover{
        color: #fff;
        border:1px solid #fff;
        background: var(--blue);
    }
`