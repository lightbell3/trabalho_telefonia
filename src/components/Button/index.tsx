import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string;
}

export function Button({title, ...rest}: IButtonProps){
    return(
        <Container>
            {title}
        </Container>
    )
}