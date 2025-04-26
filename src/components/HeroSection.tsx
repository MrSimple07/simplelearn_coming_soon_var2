import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pocket as RocketIcon, MessageSquare, CreditCard, Mail, ArrowRight, AlertCircle, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from './StripeCheckout';
import Button from './Button';
import { saveToWaitlist } from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');
  const [emailMessage, setEmailMessage] = useState('');

  const handleTelegramClick = async (type: 'channel' | 'bot') => {
    try {
      const { success, error } = await saveToWaitlist('telegram_user@telegram.user', 'telegram');
      
      if (success) {
        if (type === 'channel') {
          window.open('https://t.me/Muslimbek_01', '_blank');
        } else {
          window.open('https://t.me/simplelearning_bot', '_blank');
        }
        navigate('/success?type=telegram');
      } else {
        console.error('Error saving Telegram signup:', error);
      }
    } catch (error) {
      console.error('Error saving Telegram signup:', error);
    }
  };

  const handleSurveyClick = () => {
    window.open('https://tally.so/r/wggWbJ', '_blank');
    navigate('/success?type=survey');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus('loading');
    setEmailMessage('');

    try {
      const { success, error } = await saveToWaitlist(email, 'email');
      
      if (success) {
        setEmailStatus('success');
        setEmailMessage('Thank you for joining! Check your email for updates.');
        setEmail('');
        navigate(`/success?type=email&email=${encodeURIComponent(email)}`);
      } else if (error?.message === 'User already exists') {
        setEmailStatus('exists');
      } else {
        setEmailStatus('error');
        setEmailMessage(error?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setEmailStatus('error');
      setEmailMessage('An unexpected error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setEmailStatus('idle');
    setEmailMessage('');
    setEmail('');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background/50 to-background py-20 md:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full opacity-20 blur-3xl dark:bg-blue-900/30 animate-pulse"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-purple-200/20 rounded-full opacity-20 blur-3xl dark:bg-purple-900/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 right-1/2 w-72 h-72 bg-indigo-200/20 rounded-full opacity-20 blur-3xl dark:bg-indigo-900/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center bg-background/80 border border-border px-4 py-2 rounded-full shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow"
            >
              <RocketIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium">Currently in pre-release</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Prepare smarter for your exams <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient">
                with AI
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-foreground/80 mb-6 max-w-2xl mx-auto"
            >
              DTM / ЕГЭ / IELTS — Personalized quizzes, summaries, and mock exams.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto"
            >
              Get early access to our AI-powered learning platform. Be the first to try it out and shape the future of learning.
            </motion.p>
          </div>

          <div className="space-y-6">
            {emailStatus === 'exists' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-lg"
              >
                <div className="relative">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-12 h-12 text-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="pt-12">
                  <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-3">
                    You're already on board!
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-6 text-lg">
                    We already have your email in our waitlist.
                  </p>
                  <div className="space-y-4 max-w-md mx-auto">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://t.me/Muslimbek_01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Join our Telegram Channel</span>
                    </motion.a>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetForm}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                    >
                      Try another email
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Survey Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg"
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Help Shape Our Platform</h3>
                    <p className="text-foreground/80">
                      Take a quick survey to help us understand your needs and preferences.
                    </p>
                  </div>
                  <Button
                    onClick={handleSurveyClick}
                    className="w-full group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-300" />
                    Take the quick Survey
                  </Button>
                </motion.div>

                {/* Email Signup Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg"
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Get Early Access</h3>
                    <p className="text-foreground/80">
                      Join our waitlist to be notified when we launch.
                    </p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    </div>
                    <Button
                      type="submit"
                      className="w-full group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-purple-500/20"
                      disabled={emailStatus === 'loading'}
                    >
                      {emailStatus === 'loading' ? (
                        'Joining...'
                      ) : (
                        <>
                          Join Waitlist <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    {emailMessage && (
                      <p className={`text-sm ${emailStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {emailMessage}
                      </p>
                    )}
                  </form>
                </motion.div>

                {/* Payment Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg"
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Get Early Premium Access</h3>
                    <p className="text-foreground/80">
                      Get early access to all features and exclusive benefits.
                    </p>
                  </div>
                  <StripeCheckout />
                </motion.div>

                {/* Telegram Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg"
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg 
                        className="w-6 h-6 text-blue-600 dark:text-blue-400" 
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.03-1.74 1.11-4.95 3.24-.47.32-.89.48-1.27.47-.42-.01-1.22-.24-1.82-.43-.73-.24-1.32-.36-1.27-.77.03-.21.32-.43.89-.66 3.48-1.51 5.8-2.51 6.97-2.99 3.32-1.35 4-.59 3.37.62z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Join Our Community</h3>
                    <p className="text-foreground/80">
                      Get updates and connect with other learners.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Button 
                      variant="outline"
                      className="w-full group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-blue-500/20"
                      onClick={() => handleTelegramClick('channel')}
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
                      className="w-full group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-blue-500/20"
                      onClick={() => handleTelegramClick('bot')}
                    >
                      <svg 
                        className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-300" 
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.03-1.74 1.11-4.95 3.24-.47.32-.89.48-1.27.47-.42-.01-1.22-.24-1.82-.43-.73-.24-1.32-.36-1.27-.77.03-.21.32-.43.89-.66 3.48-1.51 5.8-2.51 6.97-2.99 3.32-1.35 4-.59 3.37.62z"/>
                      </svg>
                      Join with Telegram Bot
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;