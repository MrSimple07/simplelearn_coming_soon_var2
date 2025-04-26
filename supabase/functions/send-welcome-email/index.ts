import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
      status: 204 
    });
  }

  try {
    const { email } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      );
    }

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const { data, error } = await resend.emails.send({
      from: 'AI Study Platform <welcome@aistudyplatform.com>',
      to: email,
      subject: 'Welcome to AI Study Platform! 🚀',
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 20px;">Welcome to AI Study Platform!</h1>
          
          <p style="color: #1f2937; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Thank you for joining our waitlist! We're excited to have you on board as we prepare to launch our AI-powered study platform.
          </p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 10px;">What's Next?</h2>
            <ul style="color: #4b5563; font-size: 16px; line-height: 1.5; padding-left: 20px;">
              <li>You'll be among the first to access our platform when we launch</li>
              <li>Get 30 days of premium features completely free</li>
              <li>Enjoy 50% off your first year subscription</li>
            </ul>
          </div>
          
          <p style="color: #1f2937; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            In the meantime, join our Telegram bot to get early access to some features and stay updated with our progress:
          </p>
          
          <a 
            href="https://t.me/simplelearning_bot" 
            style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; margin-bottom: 20px;"
          >
            Join Telegram Bot
          </a>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
            If you have any questions, feel free to reach out to us at support@aistudyplatform.com
          </p>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin-top: 20px;">
            Best regards,<br>
            The AI Study Platform Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 500 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});