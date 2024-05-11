import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "_components/ErrorMessage/"
import { registerRequest } from "_api/register/register";
import { Spinner, useToast, Box } from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react'

const schemmaRegister = z.object({
    name: z.string().min(4, 'Minimo de 4 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(4, 'Minimo de 4 caracteres')
})

type FormRegister = z.infer<typeof schemmaRegister>;

const RegisterPage = () => {

    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormRegister>({
        mode: "all",
        resolver: zodResolver(schemmaRegister),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const aoSubmeter = async (dados: FormRegister) => {
        try {
            setIsLoading(true);

            await registerRequest(dados);

            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

        } catch (error) {
            console.log(error);
            toast({
                title: 'Erro to create a new user.',
                description: "Error",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false);

            navigate('/login');
        }
    }

    return(
        <form id="form-register" onSubmit={handleSubmit(aoSubmeter)}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                    type='text' 
                    autoComplete="name"
                    isInvalid={!!errors.name}
                    {...register('name')}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormControl>

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
    )
}
export default RegisterPage;