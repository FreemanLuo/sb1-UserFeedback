import { toast } from 'react-hot-toast';
import { supabase } from './supabase';
import type { QueueItem, SubmissionStore, UserSubmission } from './types';

class LocalSubmissionStore implements SubmissionStore {
  private static instance: LocalSubmissionStore;
  private queue: QueueItem[] = [];
  private syncInProgress = false;
  private syncInterval: NodeJS.Timeout | null = null;

  private constructor() {
    const savedQueue = localStorage.getItem('submissionQueue');
    if (savedQueue) {
      this.queue = JSON.parse(savedQueue);
    }
    
    this.startSync();
    
    window.addEventListener('online', () => this.sync());
    window.addEventListener('offline', () => {
      toast.error('You are offline. Data will be synced when connection is restored.');
    });
  }

  static getInstance(): LocalSubmissionStore {
    if (!LocalSubmissionStore.instance) {
      LocalSubmissionStore.instance = new LocalSubmissionStore();
    }
    return LocalSubmissionStore.instance;
  }

  private startSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    this.syncInterval = setInterval(() => this.sync(), 5000);
  }

  private saveToLocalStorage() {
    localStorage.setItem('submissionQueue', JSON.stringify(this.queue));
  }

  async add(submission: Omit<UserSubmission, 'id'>) {
    const queueItem: QueueItem = {
      ...submission,
      localId: crypto.randomUUID(),
      synced: false
    };

    this.queue.push(queueItem);
    this.saveToLocalStorage();
    
    if (navigator.onLine) {
      await this.sync();
    } else {
      toast.warning('Saved locally. Will sync when connection is restored.');
    }
  }

  getUnsynced(): QueueItem[] {
    return this.queue.filter(item => !item.synced);
  }

  async sync() {
    if (this.syncInProgress || !navigator.onLine) return;
    
    this.syncInProgress = true;
    const unsynced = this.getUnsynced();
    
    if (unsynced.length === 0) {
      this.syncInProgress = false;
      return;
    }

    for (const item of unsynced) {
      try {
        const { error } = await supabase
          .from('UserFillDB')
          .insert([{
            User: item.User,
            FillContents: item.FillContents,
            Date: item.Date
          }]);

        if (error) throw error;

        const index = this.queue.findIndex(q => q.localId === item.localId);
        if (index !== -1) {
          this.queue[index].synced = true;
          this.saveToLocalStorage();
        }
      } catch (error) {
        console.error('Sync error:', error);
      }
    }

    this.syncInProgress = false;
    this.cleanup();
  }

  private cleanup() {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    this.queue = this.queue.filter(item => {
      if (!item.synced) return true;
      const itemDate = new Date(item.Date);
      return itemDate > oneDayAgo;
    });

    this.saveToLocalStorage();
  }
}

export const store = LocalSubmissionStore.getInstance();