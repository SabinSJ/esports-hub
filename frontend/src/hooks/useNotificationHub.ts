'use clinet';

import { useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { type Notification } from '@/types/Notifications';

const HUB_URL = `${process.env.NEXT_PUBLIC_API_URL}/hubs/notifications`;

export const useNotificationHub = (
  onNotificationReceived: (notification: Notification) => void
) => {
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(HUB_URL, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.on('NotificationReceived', (notification: Notification) => {
      onNotificationReceived(notification);
    });

    const startConnection = async () => {
      try {
        await connection.start();

        console.log('SignalR connected');
      } catch (error) {
        console.error('SignalR connection failed: ', error);
      }
    };

    startConnection();

    return () => {
      connection.stop();
    };
  }, [onNotificationReceived]);
};
