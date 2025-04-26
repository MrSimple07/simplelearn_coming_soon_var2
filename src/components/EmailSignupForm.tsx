import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send as SendIcon, Check as CheckIcon, AlertCircle as AlertIcon, Rocket as RocketIcon, Clock as ClockIcon } from 'lucide-react';
import Button from './Button';
import { saveToWaitlist } from '../services/supabase';
import { sendWelcomeEmail } from '../services/email';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabase';

interface EmailSignupFormProps {
  onSuccess?: () => void;
}

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ email: string }>();
  
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // First try to add to waitlist
      const { error: waitlistError } = await supabase
        .from('waitlist')
        .insert([{ 
          email,
          signup_method: 'email'
        }]);

      if (waitlistError) {
        if (waitlistError.code === '23505') { // Unique constraint violation
          setIsExistingUser(true);
          setStatus('success');
          setMessage('You are already on our waitlist!');
        } else {
          throw waitlistError;
        }
      } else {
        setIsExistingUser(false);
        setStatus('success');
        setMessage('Thank you for joining our waitlist!');

        // Try to send welcome email, but don't let it break the flow
        try {
          await sendWelcomeEmail(email);
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't show error to user since they're already on the waitlist
        }
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full max-w-md">
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            {isExistingUser ? (
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <RocketIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {isExistingUser ? 'You\'re Already on the List!' : 'Welcome Aboard! 🚀'}
              </h3>
              <p className="text-sm text-foreground/80">
                {isExistingUser 
                  ? 'We\'ll notify you when we launch. Stay tuned!'
                  : 'Check your inbox for a welcome email with exclusive benefits.'}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckIcon className="w-4 h-4 text-green-500" />
              <span>Priority access to new features</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckIcon className="w-4 h-4 text-green-500" />
              <span>30 days of premium features free</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckIcon className="w-4 h-4 text-green-500" />
              <span>50% off your first year</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
            <Button
              variant="outline"
              className="w-full group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-blue-500/20"
              onClick={() => window.open('https://t.me/Muslimbek_01', '_blank')}
            >
              <svg 
                className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-300" 
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.03-1.74 1.11-4.95 3.24-.47.32-.89.48-1.27.47-.42-.01-1.22-.24-1.82-.43-.73-.24-1.32-.36-1.27-.77.03-.21.32-.43.89-.66 3.48-1.51 5.8-2.51 6.97-2.99 3.32-1.35 4-.59 3.37.62z"/>
              </svg>
              Join Our Telegram Channel for Updates
            </Button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmitForm} className="w-full">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`w-full h-12 px-4 rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-border'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground`}
                placeholder="Your email address"
                disabled={status === 'loading' || status === 'success'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="absolute -bottom-6 left-0 text-red-500 text-sm flex items-center">
                  <AlertIcon className="w-3 h-3 mr-1" />
                  {errors.email.message}
                </div>
              )}
            </div>
            <Button 
              type="submit"
              size="lg"
              disabled={status === 'loading' || status === 'success'}
              className="whitespace-nowrap"
            >
              {status === 'loading' ? (
                'Joining...'
              ) : (
                <span className="flex items-center">
                  <SendIcon className="w-5 h-5 mr-2" />
                  Join Waitlist
                </span>
              )}
            </Button>
          </div>
          {status === 'error' && (
            <p className="mt-2 text-red-500 text-sm">{message}</p>
          )}
          <p className="mt-4 text-xs text-foreground/60">
            We respect your privacy. No spam, ever. You can unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
};

export default EmailSignupForm;