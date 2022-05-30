import { useState, FormEvent, useEffect } from "react";
import { FiDelete, FiEdit, FiTool} from 'react-icons/fi';
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container, Form, Table, ButtonIcon} from "./styles";
import api from "../../services/api"

interface IDashboard{
    id: string;
    name: string;
    cpf: string;
    sector: string;
    company: string;
}

export function DashboardUser(){
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [sector, setSector] = useState('');
    const [company, setCompany] = useState('');
    const [users, setUsers] = useState<IDashboard[]>([]);
    const [status, setStatus] = useState('');
    
    async function handleAddUser(event: FormEvent){
        event.preventDefault();
        if(status === ''){
            const user = {
                name, 
                cpf,
                sector,
                company
            }
            await api.post(`/users`, user)

        }
        else{
            
            const user = {
                name, 
                cpf,
                sector,
                company
            }
            const {id} = await api.put(`/users/${status}`, user).then( dados=> dados.data.id)
            setStatus('')

        }
        setName('')
        setCpf('')
        setSector('')
        setCompany('')
       
    }

    async function handleDeleteUser(id: string){
        setUsers(users.filter(usr=> usr.id !== id))
        await api.delete(`/users/${id}`)
    }

    async function handleUpdateUser(id: string){
        const dados = await api.get(`/users/${id}`).then(dados=> dados.data)
        setName(dados.name)
        setCpf(dados.cpf)
        setSector(dados.sector)
        setCompany(dados.company)
        setStatus(id)
    }


    async function loadUsers(){
        const dataUser = await api.get(`/users`).then( dados => dados.data)
        setUsers(dataUser)
    }

    useEffect(() => {
        loadUsers()
    },[users])

    return(
        <Container>
            <Header title="Cadastro de usuário"/>

            <Form onSubmit={handleAddUser}>
                <Input
                    placeholder="Nome"
                    value={name} 
                    onChange={event => setName(event.target.value)}
                />

                <Input 
                    placeholder="CPF"
                    value={cpf}
                    onChange={event => setCpf(event.target.value)}
                />

                <Input 
                    placeholder="Setor"
                    value={sector}
                    onChange={event => setSector(event.target.value)}
                />

                <Input 
                    placeholder="Empresa"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

                <Button 
                    title='Enviar'
                    type= 'submit'
                />
            </Form>


            <Table>
                <thead>
                
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Setor</th>
                        <th>Empresa</th>
                        <th><FiTool size={30}/></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.cpf}</td>
                            <td>{user.sector}</td>
                            <td>{user.company}</td>
                            <td>
                                <ButtonIcon type="button" onClick={() => handleDeleteUser(user.id)}>
                                    <FiDelete size={30}/>
                                </ButtonIcon>
                                <ButtonIcon type="button" onClick={() => handleUpdateUser(user.id)}>
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