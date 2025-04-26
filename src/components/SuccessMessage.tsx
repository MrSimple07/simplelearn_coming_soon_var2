import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface SuccessMessageProps {
  message: string;
  subMessage?: string;
  onTryAnotherEmail?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message, 
  subMessage,
  onTryAnotherEmail 
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Welcome Aboard! 🚀
        </h3>
        
        <p className="text-foreground/80 mb-6">
          {message}
        </p>

        {subMessage && (
          <p className="text-sm text-foreground/60 mb-6">
            {subMessage}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Button
          onClick={() => navigate('/')}
          className="w-full group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <Mail className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-300" />
          Sign up with another email
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="w-full group hover:bg-foreground/5 dark:hover:bg-foreground/5 hover:shadow-lg hover:shadow-blue-500/20"
        >
          Return to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default SuccessMessage; 