import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { store } from '../lib/store';

export function useSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitData = async (username: string, content: string) => {
    if (!username.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return false;
    }

    setIsSubmitting(true);
    
    try {
      await store.add({
        User: username.trim(),
        FillContents: content.trim(),
        Date: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitData
  };
}