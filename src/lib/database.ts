import { supabase } from './supabase';
import { UserSubmission } from './types';

export async function submitUserData(userData: Omit<UserSubmission, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('UserFillDB')
      .insert([
        {
          User: userData.User,
          FillContents: userData.FillContents,
          Date: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error submitting data:', error);
    return { success: false, error: error.message };
  }
}

export async function fetchSubmissions() {
  try {
    const { data, error } = await supabase
      .from('UserFillDB')
      .select('*')
      .order('Date', { ascending: false });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    return { success: false, error: error.message };
  }
}