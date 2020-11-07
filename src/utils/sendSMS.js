import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

async function sendSMS () {

    const user_id = await AsyncStorage.getItem('@HS:user_id');
    if (!user_id) {
        return 'Não foi possível enviar a mensagem';
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
        return 'Não foi possível enviar a mensagem';
    }
}

export { sendSMS };