import { type Notification } from '@/types/Notifications';
import { fetchApiServer } from './server';

export const getNotifications = () =>
  fetchApiServer<Notification[]>('/api/notification');

export const markNotificationAsRead = (id: number) =>
  fetchApiServer(`/api/notification/${id}/read`, {
    method: 'PATCH',
  });

export const markAllNotificationsAsRead = () =>
  fetchApiServer('/api/notification/read-all', {
    method: 'PATCH',
  });

export const deleteNotification = (id: number) =>
  fetchApiServer(`/api/notification/${id}`, {
    method: 'DELETE',
  });
