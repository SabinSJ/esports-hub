'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '@/lib/api/notifications';

import { useNotificationHub } from '@/hooks/useNotificationHub';

import { type Notification } from '@/types/Notifications';
import { formatNotificationDate } from '@/utils/formatDate';

import styles from './NotificationDropdown.module.css';

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleNotificationReceived = useCallback(
    (notification: Notification) => {
      setNotifications((previous) => [notification, ...previous]);
    },
    []
  );

  useNotificationHub(handleNotificationReceived);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(
    (notification) => notification.readAt === null
  ).length;

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    loadNotifications();

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                readAt: new Date().toISOString(),
              }
            : notification
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      const readAt = new Date().toISOString();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          readAt,
        }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  return (
    <div ref={dropdownRef} className={styles.dropdownWrapper}>
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`${styles.notificationButton} ${
          open ? styles.notificationButtonActive : ''
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {unreadCount > 0 && <span className={styles.notificationBadge} />}
      </button>

      {open && (
        <div className={styles.notificationDropdown}>
          <div className={styles.notificationHeader}>
            <div className={styles.notificationTitle}>
              <span>Notifications</span>

              {unreadCount > 0 && (
                <span className={styles.notificationCount}>
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className={styles.markAllRead}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className={styles.notificationList}>
            {notifications.length === 0 ? (
              <div className={styles.notificationEmpty}>No notifications</div>
            ) : (
              notifications.map((notification) => {
                const isUnread = notification.readAt === null;

                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => markRead(notification.id)}
                    className={`${styles.notificationItem} ${
                      isUnread
                        ? styles.notificationItemUnread
                        : styles.notificationItemRead
                    }`}
                  >
                    <div className={styles.notificationContent}>
                      <p className={styles.notificationMessage}>
                        {notification.message}
                      </p>

                      <span className={styles.notificationTimestamp}>
                        {formatNotificationDate(notification.createdAt)}
                      </span>
                    </div>

                    {isUnread && (
                      <span className={styles.notificationUnreadDot} />
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className={styles.notificationFooter}>
            <button type="button" className={styles.viewAllNotifications}>
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
