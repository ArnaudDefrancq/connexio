export interface User {
    id_user?: number,
    email: string,
    password: string,
    created_at: number,
    id_role: number
};

export default User;