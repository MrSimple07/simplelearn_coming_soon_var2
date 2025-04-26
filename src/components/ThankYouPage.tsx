import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, Gift } from 'lucide-react';
import Button from './Button';

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-background/80 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Thanks for joining the early access list!
          </h1>
          
          <p className="text-xl text-foreground/80 mb-8">
            Your support helps us build the platform you actually need.
            We'll be launching within 30 days.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Gift className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Early Access Benefits</h3>
              <p className="text-foreground/80">
                Want a refund anytime before launch? Just ask — or get +1 month free as a beta tester.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Stay Updated</h3>
              <p className="text-foreground/80">
                Join our Telegram Channel for updates & sneak peeks.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-blue-500/20"
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
            Join Telegram Channel
          </Button>
          
          <Button
            variant="outline"
            className="group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-purple-500/20"
            onClick={() => window.open('https://tally.so/r/wggWbJ', '_blank')}
          >
            Share Your Feedback
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage; 