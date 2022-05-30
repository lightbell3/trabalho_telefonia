import styled from "styled-components";

export const Container = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2.5rem 1rem;
`

export const Form = styled.form`

`

export const Table = styled.table`
    margin-top: 4rem;
    width: 100%;
    border-spacing: 0 0.5rem;
    font-family: sans-serif;
    th{
        color: var(--title-color);
        font-weight: 400;
        padding: 1rem 2rem;
        text-align: left;
        line-height: 1.5rem;
    }
    td{
        padding: 1rem 2rem;
        border: 0;
      
        color: var(--text-body);
        border-radius: 0.25rem;
    }
`

export const ButtonIcon = styled.button`
    padding: 0 0.5rem;
    height: 3rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;

    &:hover{
        filter: brightness(0.9);
    }
`