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

// Function to send message to Telegram
async function sendTelegramMessage(chatId: number, text: string, parseMode: string = 'HTML') {
  console.error('[DEBUG] Attempting to send Telegram message...');
  console.error('[DEBUG] Chat ID:', chatId);
  console.error('[DEBUG] Message:', text);

  const telegramBotToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
  if (!telegramBotToken) {
    console.error('[ERROR] TELEGRAM_BOT_TOKEN is not set');
    throw new Error('TELEGRAM_BOT_TOKEN is not set');
  }

  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  console.error('[DEBUG] Telegram API URL:', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode
      })
    });

    console.error('[DEBUG] Telegram API Response Status:', response.status);
    const responseData = await response.json();
    console.error('[DEBUG] Telegram API Response:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.error('[ERROR] Telegram API Error:', responseData);
      throw new Error(`Telegram API error: ${responseData.description}`);
    }

    return responseData;
  } catch (error) {
    console.error('[ERROR] Error in sendTelegramMessage:', error);
    throw error;
  }
}

serve(async (req) => {
  // Log the full request details
  console.error('[DEBUG] ====== New Request ======');
  console.error('[DEBUG] Request URL:', req.url);
  console.error('[DEBUG] Request Method:', req.method);
  console.error('[DEBUG] Request Headers:', JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2));
  
  // Handle health check
  if (req.url.endsWith('/health')) {
    console.error('[DEBUG] Health check requested');
    return new Response(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
  
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    console.error('[DEBUG] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.error('[DEBUG] Reading request body...');
    const body = await req.text();
    console.error('[DEBUG] Request body:', body);
    
    // Log environment variables (without sensitive values)
    console.error('[DEBUG] Environment check:');
    console.error('[DEBUG] SUPABASE_URL exists:', !!Deno.env.get('SUPABASE_URL'));
    console.error('[DEBUG] SUPABASE_SERVICE_ROLE_KEY exists:', !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
    console.error('[DEBUG] TELEGRAM_BOT_TOKEN exists:', !!Deno.env.get('TELEGRAM_BOT_TOKEN'));
    
    const { update } = JSON.parse(body);
    console.error('[DEBUG] Parsed update:', JSON.stringify(update, null, 2));
    
    // Handle /start command or user joining
    if (update?.message?.text === '/start' || update?.message?.chat) {
      console.error('[DEBUG] Processing /start command or new chat');
      
      const chatId = update.message.chat.id;
      const user = update.message.from;
      console.error('[DEBUG] User info:', JSON.stringify(user, null, 2));
      
      // Create a unique email-like identifier for the user
      const email = `${user.username || user.id}@telegram.user`;
      console.error('[DEBUG] Generated email:', email);

      // Save to the waitlist with telegram as the signup method
      console.error('[DEBUG] Saving to waitlist...');
      const { error: waitlistError } = await supabaseClient
        .from('waitlist')
        .upsert({ 
          email,
          signup_method: 'telegram',
          signup_date: new Date(),
          telegram_data: {
            chat_id: chatId,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            language_code: user.language_code,
            is_bot: user.is_bot
          }
        });

      if (waitlistError) {
        console.error('[ERROR] Error saving to waitlist:', waitlistError);
        throw waitlistError;
      }
      console.error('[DEBUG] Successfully saved to waitlist');

      // Send welcome message via Telegram API
      const welcomeMessage = `Welcome to AI Study Platform waitlist! 🚀\n\n` +
        `You've been added to our early access list and will be notified when we launch.\n\n` +
        `As an early user, you'll get:\n` +
        `• 30 days of premium features free\n` +
        `• 50% off your first year subscription\n` +
        `• Priority access to new features\n\n` +
        `Stay tuned for updates!`;

      console.error('[DEBUG] Sending welcome message...');
      await sendTelegramMessage(chatId, welcomeMessage);
      console.error('[DEBUG] Welcome message sent successfully');

      return new Response(JSON.stringify({ status: 'success' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    console.error('[DEBUG] No /start command or new chat detected');
    return new Response(JSON.stringify({ status: 'success' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('[ERROR] Error in telegram bot:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});