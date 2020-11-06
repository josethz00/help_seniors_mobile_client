import { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotifications } from './registerForPushNotifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});
  

const useNotifications = () => {

    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();

    useEffect(() => {

        registerForPushNotifications().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
        }

    }, []); 

    return expoPushToken;

};

export { useNotifications };