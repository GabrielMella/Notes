export interface AuthRequest {
    email: string,
    password: string
}

export interface AuthResponse {
    data: {
        access_token: string,
        token_type: string
    }
}