import axios from 'axios'
import { RegisterRequest, RegisterResponse } from '_types/register'

export async function registerRequest(credentials: RegisterRequest): Promise<RegisterResponse> {

    try {
        const response = await axios.post<RegisterResponse>('http://localhost:8080/register', credentials);
        return response.data;
    } catch (error) {
        console.error('Erro na solicitação de registro:', error);
        throw error;
    }
}