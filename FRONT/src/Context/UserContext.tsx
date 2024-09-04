import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { Security } from '../Tools/Security';
import { UserState } from '../Types/UserState';

interface UserContextType extends UserState {
    updateUserContext: (field: keyof UserState, value: string | boolean | null) => void;
    logoutUser: () => void;
}

export const UserContext = createContext<UserContextType>({
    token: null,
    role: null,
    user_id: null,
    is_actif: null,
    updateUserContext: () => {},
    logoutUser: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const getInitialUserState = (): UserState => {
        const storedUser = localStorage.getItem('data');
        return storedUser ? Security.decryptData(storedUser) : { token: null, role: null, user_id: null, is_actif: null };
    };

    const [user, setUser] = useState<UserState>(getInitialUserState);
    

    const updateUserContext = (field: keyof UserState, value: string | boolean | null) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, [field]: value };
            localStorage.setItem('data', JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    const logoutUser = () => {
        localStorage.removeItem('data');
        setUser({ token: null, role: null, user_id: null, is_actif: null });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('data');
        if (storedUser) {
            setUser(Security.decryptData(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ ...user, updateUserContext, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;