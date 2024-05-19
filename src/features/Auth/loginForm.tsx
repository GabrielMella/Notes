import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";


import { loginRequest } from "_api/auth/auth";
import { ErrorMessage } from "_components/ErrorMessage"
import { useAuthStore } from "_store/auth";

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Spinner
} from '@chakra-ui/react'
import PageContainer from "_components/Layout";


const schemmaLogin = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(4, 'Minimo de 4 caracteres')
})

type FormLogin = z.infer<typeof schemmaLogin>;

const LoginForm = () => {

    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormLogin>({
        mode: "all",
        resolver: zodResolver(schemmaLogin),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const setToken = useAuthStore(state => state.setToken);

    const aoSubmeter = async (dados: FormLogin) => {
        try {
            setIsLoading(true);
            const loginResponse = await loginRequest(dados)

            // store token with zustand
            setToken(loginResponse.access_token);

            // SWR
            mutate('/api/login', { ...loginResponse }, false);

            navigate('/home');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <PageContainer>
            <form id="form-login" onSubmit={handleSubmit(aoSubmeter)}>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input 
                        type='email' 
                        autoComplete="email"
                        isInvalid={!!errors.email}
                        {...register('email')}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input 
                        type='password'
                        isInvalid={!!errors.password}
                        {...register('password')}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </FormControl>

                <Box display="flex" alignItems="center" justifyContent="center" p={5}>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Button type="submit" colorScheme='blue'>Sign in</Button>
                    )}
                </Box>
            </form>
        </PageContainer>
    )
}
export default LoginForm;