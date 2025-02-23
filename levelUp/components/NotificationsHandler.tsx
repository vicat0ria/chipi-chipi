import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NotificationsHandler: React.FC = () => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

    useEffect(() => {
        const requestNotificationPermission = async () => {
            const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            if (status !== 'granted') {
                const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                if (newStatus !== 'granted') {
                    Alert.alert('Permission Denied', 'You will not receive notifications.');
                    return;
                }
            }

            const token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log('Expo Push Token:', token);
            setExpoPushToken(token);
        };

        requestNotificationPermission();
    }, []);

    return null; // No UI needed, just runs in the background
};

export default NotificationsHandler;
