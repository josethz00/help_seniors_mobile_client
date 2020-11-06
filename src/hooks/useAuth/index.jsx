import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';


const AuthContext = createContext({signed:false, user:{}});

export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadStorageData(){ 

            const storagedUser = await AsyncStorage.getItem('@HS:user');
            const storagedToken = await AsyncStorage.getItem('@HS:token');
            const storagedUserId = await AsyncStorage.getItem('@HS:user_id');

            if(storagedUser && storagedToken && storagedUserId){
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(email, password){
        try {
            const { data } = await api.post('auth?type=user', { email, password });
            await AsyncStorage.setItem('@HS:user', JSON.stringify(data.user));
            await AsyncStorage.setItem('@HS:user_id', JSON.stringify(data.id));
            await AsyncStorage.setItem('@HS:token', data.token);
            api.defaults.headers.authorization = `Bearer ${data.token}`;
            setUser(data.user);
        }
        catch (err) {
            alert ('Não foi possível fazer login');
        }

    }
    
    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }
    

    return (
        <AuthContext.Provider value={{ signed: !! user, user, signIn, signOut, loading }} >
            {children}
        </AuthContext.Provider>
    );
    
};

export default AuthContext;