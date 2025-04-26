import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
});

interface SignupData {
  signupMethod: 'email' | 'telegram';
  language: string;
}

export const saveToWaitlist = async (email: string, method: 'email' | 'telegram'): Promise<{ success: boolean; error?: { message: string } }> => {
  try {
    if (method === 'telegram') {
      // Get the count of existing Telegram users
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .like('email', 'telegram_%');

      // Generate the next sequential number
      const nextNumber = (count || 0) + 1;
      const telegramEmail = `telegram_${nextNumber}@simplelearn.uz`;

      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: telegramEmail,
            signup_method: method,
            signup_date: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      return { success: true };
    } else {
      // For email signups, check if user already exists
      const { data: existingUser } = await supabase
        .from('waitlist')
        .select('*')
        .eq('email', email)
        .single();

      if (existingUser) {
        return {
          success: false,
          error: { message: 'User already exists' }
        };
      }

      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email,
            signup_method: method,
            signup_date: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      return { success: true };
    }
  } catch (error) {
    console.error('Error saving to waitlist:', error);
    return {
      success: false,
      error: { message: 'Failed to save to waitlist' }
    };
  }
};

export const updatePaymentStatus = async (email: string, paymentId: string, status: 'completed' | 'refunded') => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .update({ 
        payment_status: status,
        payment_id: paymentId,
        payment_date: new Date()
      })
      .eq('email', email);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating payment status:', error);
    return { 
      success: false, 
      error: { 
        message: 'Failed to update payment status',
        code: 'UPDATE_ERROR'
      } 
    };
  }
};

export const saveFeedback = async (email: string, feedback: any) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    const { error: updateError } = await supabase
      .from('waitlist')
      .update({ 
        feedback_data: feedback
      })
      .eq('email', email);

    if (updateError) throw updateError;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving feedback:', error);
    return { 
      success: false, 
      error: { 
        message: 'Failed to save feedback',
        code: 'FEEDBACK_ERROR'
      } 
    };
  }
};

export const getWaitlistCount = async () => {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('payment_status', 'completed');

    if (error) throw error;
    
    // Add some fake users to the count for social proof
    return (count || 0) + 500; 
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return 500; // Fallback count
  }
};