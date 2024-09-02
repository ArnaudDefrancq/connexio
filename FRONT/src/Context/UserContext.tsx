import { createContext, useState, ReactNode, FC } from 'react';

interface UserState {
    token: string | null;
    role: string | null;
    user_id: string | null;
    actif: boolean | null;
}

interface UserContextType extends UserState {
    updateUserContext: (field: keyof UserState, value: string | boolean | null) => void;
}

export const UserContext = createContext<UserContextType>({
    token: null,
    role: null,
    user_id: null,
    actif: null,
    updateUserContext: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserState>({
        token: null,
        role: null,
        user_id: null,
        actif: null,
    });

    const updateUserContext = (field: keyof UserState, value: string | boolean | null) => {
        setUser((prevUser) => ({ ...prevUser, [field]: value }));
    };

    return (
        <UserContext.Provider value={{ ...user, updateUserContext }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;