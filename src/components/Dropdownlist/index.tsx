import { Container, DropdownListStyle} from './styles'
import { SelectHTMLAttributes } from "react";


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    
}

export function Dropdownlist({...rest}: SelectProps){
    return(
        <Container>
            <DropdownListStyle {...rest} />
        </Container>
    )
}