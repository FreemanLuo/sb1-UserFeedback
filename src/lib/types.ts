export interface UserSubmission {
  id?: string;
  User: string;
  FillContents: string;
  Date: string;
}

export interface QueueItem extends UserSubmission {
  localId: string;
  synced: boolean;
}

export interface SubmissionStore {
  add(submission: Omit<UserSubmission, 'id'>): Promise<void>;
  getUnsynced(): QueueItem[];
  sync(): Promise<void>;
}

export interface AdminCredentials {
  username: string;
  password: string;
}