import {Container, InputStyle} from './styles'
import { InputHTMLAttributes } from "react";

interface IpuntProps extends InputHTMLAttributes<HTMLInputElement> {
    
}

export function Input({...rest}: IpuntProps){
    return(
        <Container>
            <InputStyle {...rest} />
        </Container>
    )
}