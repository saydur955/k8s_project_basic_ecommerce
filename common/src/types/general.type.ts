
export enum auth_role {
    admin = 'admin',
    user = 'user'
}

export interface jwt_payload {
    id: number;
    role: auth_role;
}