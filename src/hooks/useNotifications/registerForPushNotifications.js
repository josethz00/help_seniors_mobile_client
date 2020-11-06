import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';


async function registerForPushNotifications () {

    let token;
    if (Constants.isDevice) {

        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Houve um erro inesperado,tente novamente');
            return;
        }
        
        token = (await Notifications.getExpoPushTokenAsync()).data;

    }
    else {
        alert ('Parece que o seu dispositivo não suporta sistema de notificações');
    }

    if (Platform.OS === 'android') {

        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        
    }
    
    return token;

}

export { registerForPushNotifications };
