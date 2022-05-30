import { Container, Title } from "./styles";

interface IHeaderProps{
    title: string;
}

export function Header({title}: IHeaderProps){
    return(
        <Container>
            <Title>{title}</Title>

        </Container>
    )
}