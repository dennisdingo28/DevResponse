export default function formatElapsedTime(createdAt: Date): string {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);
    const elapsedTimeMilliseconds = currentTime.getTime() - createdAtTime.getTime();
  
    if (elapsedTimeMilliseconds < 60000) { // Less than a minute
      return "Just now";
    } else if (elapsedTimeMilliseconds < 3600000) { // Less than an hour
      const minutes = Math.floor(elapsedTimeMilliseconds / 60000);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (elapsedTimeMilliseconds < 86400000) { // Less than a day
      const hours = Math.floor(elapsedTimeMilliseconds / 3600000);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (elapsedTimeMilliseconds < 2629800000) { // Less than a month
      const days = Math.floor(elapsedTimeMilliseconds / 86400000);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (elapsedTimeMilliseconds < 31557600000) { // Less than a year
      const months = Math.floor(elapsedTimeMilliseconds / 2629800000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(elapsedTimeMilliseconds / 31557600000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  }