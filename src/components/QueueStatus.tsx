import React, { useEffect, useState } from 'react';
import { Cloud, CloudOff } from 'lucide-react';
import { store } from '../lib/store';

export function QueueStatus() {
  const [unsyncedCount, setUnsyncedCount] = useState(0);

  useEffect(() => {
    const checkQueue = () => {
      const unsynced = store.getUnsynced();
      setUnsyncedCount(unsynced.length);
    };

    // Check initially and every 5 seconds
    checkQueue();
    const interval = setInterval(checkQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  if (unsyncedCount === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <Cloud className="h-4 w-4" />
        <span>All data synced</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-amber-600">
      <CloudOff className="h-4 w-4" />
      <span>{unsyncedCount} item{unsyncedCount !== 1 ? 's' : ''} waiting to sync</span>
    </div>
  );
}