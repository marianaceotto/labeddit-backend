export interface getAllUsersInput {
    q: string,
    token: string,
}

export interface SignupInput {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutput {
    token: string
}

export interface LoginInput {
    email: unknown,
    password: unknown
}

export interface LoginOutput {
   token: string
}

export interface LogoutOutput{
    token: string
}