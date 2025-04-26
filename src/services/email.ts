import { supabase } from './supabase';

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: { email },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      throw new Error(error.message || 'Failed to send welcome email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    // Don't throw the error to prevent breaking the signup flow
    // The user can still be added to the waitlist even if the email fails
    return null;
  }
}