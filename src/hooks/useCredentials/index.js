import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../useAuth';

const useCredentials = () => {

    const { signOut } = useContext(AuthContext);

    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        async function loadStoragedData () {
            const _token = await AsyncStorage.getItem('@HS:token');
            const _userId = await AsyncStorage.getItem('@HS:user_id');
            const decodedToken = jwt_decode(_token);

            if (decodedToken.exp <= Math.floor(new Date().getTime() /1000)) {
                signOut();
                return false;
            }
            setToken(`Bearer ${_token}`);
            setUserId(JSON.parse(_userId));
        }
        loadStoragedData();

    }, []);

    return { userId, token };

};

export { useCredentials };