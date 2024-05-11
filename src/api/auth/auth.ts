import axios from 'axios'
import { AuthRequest, AuthResponse } from '_types/auth'

export async function loginRequest(credentials: AuthRequest) {
 
    const response = await axios.post<AuthResponse, AuthResponse>('http://localhost:8080/login', credentials);
    console.log(response.data);

    return response.data;
}