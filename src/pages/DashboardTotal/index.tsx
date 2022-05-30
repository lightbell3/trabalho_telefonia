import {useState, useEffect } from 'react'
import { Header} from "../../components/Header"
import {Container, Content, LabelStyle } from "./styles"

import api from '../../services/api'

interface ITotal{
    id: string;
    line_number: string;
    chip_number: string;
    data_plan: string;
    account_number: string;
    telephone_operator: string;
}

export function Total(){
    const [totalLineVivo, setTotalLineVivo] = useState(0)
    const [totalLineClaro, setTotalLineClaro] = useState(0)
    const [totalLineTim, setTotalLineTim] = useState(0)
    const [totalPlan20, setTotalPlan20] = useState(0)
    const [totalPlan30, setTotalPlan30] = useState(0)
    const [totalDDD24, setTotalDD24] = useState(0)
    const [totalDDD31, setTotalDD31] = useState(0)
    const [totalDDD21, setTotalDD21] = useState(0)

    let telephone: ITotal[] = []
    
    async function loadTelephone(){
        const dataTelephone = await api.get('/telephoneline').then(dados=>dados.data)
        if(dataTelephone){
            telephone = dataTelephone
            setTotalLineVivo((telephone
                .filter(tel => tel.telephone_operator ==='Vivo').length))
            setTotalLineClaro((telephone
                .filter(tel => tel.telephone_operator ==='Claro').length))
            setTotalLineTim((telephone
                .filter(tel => tel.telephone_operator ==='Tim').length))
            setTotalPlan20((telephone
                .filter(tel => tel.data_plan ==='20 GB').length))
            setTotalPlan30((telephone
                .filter(tel => tel.data_plan ==='30 GB').length))
            
            let total24 = 0
            let total31 = 0
            let total21 = 0
            telephone.map(tel=>{
                
                if(tel.line_number.startsWith('24')){
                    total24 += 1
                }
                if(tel.line_number.startsWith('21')){
                    total21 += 1
                }
                if(tel.line_number.startsWith('31')){
                    total31 += 1
                }
            })
            setTotalDD24(total24)
            setTotalDD21(total21)
            setTotalDD31(total31)
        }
    }

    useEffect(()=>{
        loadTelephone()
    },[])

    return(
        <Container>
            <Header title="Totais"/>

            <Content>
                <LabelStyle>Total de linhas da Vivo: {totalLineVivo}</LabelStyle>
                <LabelStyle>Total de linhas da Claro: {totalLineClaro}</LabelStyle>
                <LabelStyle>Total de linhas da Tim: {totalLineTim}</LabelStyle>
                <LabelStyle>Total de plano de 20GB: {totalPlan20}</LabelStyle>
                <LabelStyle>Total de plano de 30GB: {totalPlan30}</LabelStyle>
                <LabelStyle>Total de DDD 24: {totalDDD24}</LabelStyle>
                <LabelStyle>Total de DDD 21: {totalDDD21}</LabelStyle>
                <LabelStyle>Total de DDD 31: {totalDDD31}</LabelStyle>
            </Content>
        </Container>
    )
}