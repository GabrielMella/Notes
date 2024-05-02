import axios from 'axios'
import { Auth, AuthResponse } from '../../types/auth'

export const loginRequest = async (credentials: Auth) => {
 
    //axios.post<AuthResponse, AuthResponse>('http://localhost:8080/login', credentials)

    return {token: 'tokenTeste'}
}