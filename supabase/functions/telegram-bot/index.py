from flask import Flask, request, jsonify
import os
from supabase import create_client
import requests
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL", "https://enygxibkgjoqjmqsiwdi.supabase.co")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueWd4aWJrZ2pvcWptcXNpd2RpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMzOTkyOCwiZXhwIjoyMDYwOTE1OTI4fQ.YRUhwRt7SaAIejZebqxcRWism5Iuw79qS4dh4msjBFM")
supabase = create_client(supabase_url, supabase_key)

# Get Telegram bot token from environment variables
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "7782813133:AAHlfWIy_wDkug4KqjTN8yWtbBfWEiFYYko")
if not TELEGRAM_BOT_TOKEN:
    logger.error("TELEGRAM_BOT_TOKEN is not set")

@app.route('/webhook', methods=['POST', 'OPTIONS'])
def webhook():
    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
        return '', 200, headers
    
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
    
    try:
        data = request.json
        logger.info(f"Received update: {json.dumps(data)}")
        
        update = data.get('update', {})
        
        # Handle /start command or user joining
        message = update.get('message', {})
        if message.get('text') == '/start' or message.get('chat'):
            chat = message.get('chat', {})
            chat_id = chat.get('id')
            user = message.get('from', {})
            
            # Create a unique email-like identifier for the user
            username = user.get('username') or user.get('id')
            email = f"{username}@telegram.user"
            
            # Save to the waitlist with telegram as the signup method
            telegram_data = {
                'chat_id': chat_id,
                'username': user.get('username'),
                'first_name': user.get('first_name'),
                'last_name': user.get('last_name'),
                'language_code': user.get('language_code'),
                'is_bot': user.get('is_bot', False)
            }
            
            waitlist_data = {
                'email': email,
                'signup_method': 'telegram',
                'signup_date': datetime.now().isoformat(),
                'telegram_data': telegram_data
            }
            
            logger.info(f"Inserting user into waitlist: {json.dumps(waitlist_data)}")
            result = supabase.table('waitlist').upsert(waitlist_data).execute()
            if hasattr(result, 'error') and result.error:
                logger.error(f"Error saving to waitlist: {result.error}")
                raise Exception(f"Failed to save to waitlist: {result.error}")
            
            # Prepare welcome message
            welcome_message = {
                'chat_id': chat_id,
                'text': """Welcome to AI Study Platform waitlist! 🚀

You've been added to our early access list and will be notified when we launch.

As an early user, you'll get:
• 30 days of premium features free
• 50% off your first year subscription
• Priority access to new features

Stay tuned for updates!""",
                'parse_mode': 'HTML'
            }
            
            # Send welcome message to Telegram API
            telegram_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            logger.info(f"Sending message to Telegram: {json.dumps(welcome_message)}")
            response = requests.post(telegram_url, json=welcome_message)
            
            if not response.ok:
                logger.error(f"Telegram API error: {response.text}")
                return jsonify({'error': 'Failed to send message to Telegram'}), 500, headers
        
        return jsonify({'status': 'success'}), 200, headers
    
    except Exception as e:
        logger.error(f"Error in telegram bot: {str(e)}")
        return jsonify({'error': 'Failed to process request', 'message': str(e)}), 500, headers

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)