export const formatDate = (startTime: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(startTime));
};

export const formatTime = (startTime: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(startTime));
};

export const formatNotificationDate = (date: string) => {
  const notificationDate = new Date(date);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - notificationDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return notificationDate.toLocaleDateString();
};
