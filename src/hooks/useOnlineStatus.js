import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStaus] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setOnlineStaus(true);
    };
    const handleOffline = () => {
      setOnlineStaus(false);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
