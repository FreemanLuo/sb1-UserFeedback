import type { UserSubmission, SubmissionFormData } from './types';

const STORAGE_KEY = 'user_submissions';

export const storage = {
  getSubmissions: (): UserSubmission[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addSubmission: (data: SubmissionFormData): UserSubmission => {
    const submissions = storage.getSubmissions();
    const newSubmission: UserSubmission = {
      id: Date.now(),
      User: data.username,
      FillContents: data.content,
      Date: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    return newSubmission;
  }
};