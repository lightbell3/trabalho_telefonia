import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1100px;
    padding: 8px;

`


export const DropdownListStyle = styled.select`
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    
    font-size: 1rem;
    font-weight: 400;

    &:first-child
      {
        color: var(--text-body);
      }

`