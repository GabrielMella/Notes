import { useState } from "react";
import { loginRequest } from "../../api/auth/auth";
import { useAuthStore } from "../../store/auth";
import { Auth, AuthResponse } from "../../types/auth";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
  } from '@chakra-ui/react'

export default function LoginPage() {

    const setToken = useAuthStore(state => state.setToken);
    const [credentials, setCredentials] = useState<Auth>({ email: '', password: '' });

    const handleSubmit = async () => {
        const loginResponse:AuthResponse = await loginRequest(credentials)
        setToken(loginResponse.token)
        alert('Login deu certo:' + loginResponse.token);
    }

    return(
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' onChange={(e) => setCredentials({...credentials, email: e.target.value})}/>

            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>

            <Button colorScheme='blue' onClick={handleSubmit}>Enviar</Button>
        </FormControl>
    )
}