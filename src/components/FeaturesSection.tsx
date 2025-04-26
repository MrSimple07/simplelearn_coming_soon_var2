import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Calendar, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('features.aiSummarization.title'),
      description: t('features.aiSummarization.description'),
      color: 'text-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
      hoverColor: 'hover:shadow-purple-200 dark:hover:shadow-purple-900'
    },
    {
      icon: Target,
      title: t('features.examPrep.title'),
      description: t('features.examPrep.description'),
      color: 'text-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      hoverColor: 'hover:shadow-blue-200 dark:hover:shadow-blue-900'
    },
    {
      icon: Calendar,
      title: t('features.studyPlans.title'),
      description: t('features.studyPlans.description'),
      color: 'text-green-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800',
      hoverColor: 'hover:shadow-green-200 dark:hover:shadow-green-900'
    },
    {
      icon: Zap,
      title: t('features.smartQuizzes.title'),
      description: t('features.smartQuizzes.description'),
      color: 'text-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30',
      borderColor: 'border-orange-200 dark:border-orange-800',
      hoverColor: 'hover:shadow-orange-200 dark:hover:shadow-orange-900'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
        >
          {t('features.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-foreground/80 max-w-2xl mx-auto text-center mb-16"
        >
          {t('features.subtitle')}
        </motion.p>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`p-6 rounded-xl border ${feature.bgColor} ${feature.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 ${feature.hoverColor}`}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-md"
                  whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;