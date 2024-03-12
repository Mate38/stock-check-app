export interface IAuthResponse {
    access_token: string;
    auth_status: number;
}

export interface IAuthError {
    error_code: number;
    error_message: string;
}
