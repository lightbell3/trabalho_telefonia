import { useState, FormEvent, useEffect } from "react";
import { FiDelete, FiEdit, FiTool} from 'react-icons/fi';
import { Button } from "../../components/Button";
import { Dropdownlist } from "../../components/Dropdownlist";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container, Form, Table, ButtonIcon} from "./styles";
import api from "../../services/api"


interface IDashboard{
    id: string;
    line_number: string;
    chip_number: string;
    data_plan: string;
    account_number: string;
    telephone_operator: string;
}

export function DashboardTelephoneLine(){
    const [line_number, setLine_Number] = useState('');
    const [chip_number, setChip_Number] = useState('');
    const [data_plan, setData_Plan] = useState('');
    const [account_number, setAccount_Number] = useState('');
    const [telephone_operator, setTelephone_operator] = useState('');
    const [lines, setLines] = useState<IDashboard[]>([]);
    const [status, setStatus] = useState('');
    const operator_drop = ["Claro", "Tim", "Vivo"];
    const plan_drop = ["10","20 GB", "30 GB"];


    async function handleAddTelephoneLine(event: FormEvent){
        event.preventDefault();
        if(status === ''){
            const line = {
                line_number, 
                chip_number,
                data_plan,
                account_number,
                telephone_operator
            }
            await api.post(`/telephoneline`, line)

        }
        else{
            
            const line = {
                line_number, 
                chip_number,
                data_plan,
                account_number,
                telephone_operator
            }
            const {id} = await api.put(`/telephoneline/${status}`, line).then( dados=> dados.data.id)
            setStatus('')

        }
        setLine_Number('')
        setChip_Number('')
        setData_Plan('')
        setAccount_Number('')
        setTelephone_operator('')

       
    }

    async function handleDeleteTelephoneLine(id: string){
        setLines(lines.filter(line=> line.id !== id))
        await api.delete(`/telephoneline/${id}`)
    }

    async function handleUpdateTelephoneLine(id: string){
        const dados = await api.get(`/telephoneline/${id}`).then(dados=> dados.data)
        setLine_Number(dados.line_number)
        setChip_Number(dados.chip_number)
        setData_Plan(dados.data_plan)
        setAccount_Number(dados.account_number)
        setTelephone_operator(dados.telephone_operator)
        setStatus(id)
    }


    async function loadTelephoneLine(){
        const dataTelephoneLine = await api.get(`/telephoneline`).then( dados => dados.data)
        console.log(dataTelephoneLine)
        setLines(dataTelephoneLine)
    }

    useEffect(() => {
        loadTelephoneLine()
    },[lines])

    return(
        <Container>
            <Header title="Cadastro de linha telefônica"/>

            <Form onSubmit={handleAddTelephoneLine}>
                <Input 
                    placeholder="Número da linha"
                    value={line_number} 
                    onChange={event => setLine_Number(event.target.value)}
                />

                <Input 
                    placeholder="Número do chip"
                    value={chip_number}
                    onChange={event => setChip_Number(event.target.value)}
                />

                <Dropdownlist onChange={event => setData_Plan(event.target.value)} id='plan' >
                    <option value="" disabled selected>Plano de dados</option>
                    {plan_drop.map( plan =>
                            <option value = {plan}>{plan}</option>
                        )
                    }
                </Dropdownlist>

                <Input 
                    placeholder="Número da conta"
                    value={account_number}
                    onChange={event => setAccount_Number(event.target.value)}
                />

                <Dropdownlist onChange={event => setTelephone_operator(event.target.value)} id='operator'>
                    <option value="" disabled selected>Operadora</option>
                    {operator_drop.map( op =>
                            <option value = {op}>{op}</option>
                        )
                    }
                </Dropdownlist>

                <Button 
                    title='Enviar'
                    type= 'submit'
                />
            </Form>


            <Table>
                <thead>
                
                    <tr>
                        <th>Número da linha</th>
                        <th>Número do chip</th>
                        <th>Plano de dados</th>
                        <th>Número da conta</th>
                        <th>Operadora</th>
                        <th><FiTool size={30}/></th>
                    </tr>
                </thead>
                <tbody>
                    {lines.map(line=>
                        <tr key={line.id}>
                            <td>{line.line_number}</td>
                            <td>{line.chip_number}</td>
                            <td>{line.data_plan}</td>
                            <td>{line.account_number}</td>
                            <td>{line.telephone_operator}</td>
                            <td>
                                <ButtonIcon type="button" onClick={() => handleDeleteTelephoneLine(line.id)}>
                                    <FiDelete size={30}/>
                                </ButtonIcon>
                                <ButtonIcon type="button" onClick={() => handleUpdateTelephoneLine(line.id)}>
                                    <FiEdit size={30}/>
                                </ButtonIcon>
                            </td>
                        </tr>
                    )}
                </tbody>       
                
            </Table>
        </Container>
    )
}