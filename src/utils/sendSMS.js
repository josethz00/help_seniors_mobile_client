import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

async function sendSMS () {

    const user_id = await AsyncStorage.getItem('@HS:user_id');
    const _token = await AsyncStorage.getItem('@HS:token');

    if (!user_id || !_token) {
        return 'Não foi possível enviar a mensagem';
    }

    try {

        const { data } = await api.post(`users/message/${JSON.parse(user_id)}`, {
            headers: {
                authorization: `Bearer ${_token}`
            }
        });
        return data;

    }
    catch (err) {
        return 'Não foi possível enviar a mensagem';
    }
}

export { sendSMS };