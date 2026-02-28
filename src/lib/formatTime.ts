export function formatRelativeTime(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInMinutes < 1440) {
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else {
      return `${diffInHours} jam yang lalu`;
    }
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  };

  return createdDate.toLocaleDateString("id-ID", options);
}
