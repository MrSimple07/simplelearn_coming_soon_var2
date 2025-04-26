import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

// Initialize Supabase client
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // This endpoint would be secured with proper authentication in production
  
  try {
    const { subject, message } = await req.json();
    
    if (!subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Subject and message are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get all waitlist emails
    const { data: waitlistUsers, error } = await supabaseClient
      .from('waitlist')
      .select('email, signup_method')
      .eq('signup_method', 'email');
    
    if (error) throw error;
    
    // In a real implementation, you would:
    // 1. Use a proper email service (SendGrid, Mailgun, etc.)
    // 2. Handle batching for large lists
    // 3. Track delivery status
    
    // This is a simplified mock implementation
    const emailsSent = waitlistUsers?.length || 0;
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notification would be sent to ${emailsSent} users`,
        recipients: emailsSent
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error sending notifications:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to send notifications' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});