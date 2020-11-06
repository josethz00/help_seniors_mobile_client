import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

async function sendSMS () {

    const user_id = await AsyncStorage.getItem('@HS:user_id');
    if (!user_id) {
        throw new Error('Não foi possível enviar a mensagem');
    }

    try {

        const { data } = await api.post(`users/message/${JSON.parse(user_id)}`, {
            headers: {
                authorization: api.defaults.headers.authorization
            }
        });
        return data;

    }
    catch (err) {
        throw new Error('Não foi possível enviar a mensagem');
    }
}

export { sendSMS };