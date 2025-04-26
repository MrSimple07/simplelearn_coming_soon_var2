import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Early Access Benefits
          </h2>
          <p className="text-xl text-foreground/80 mb-12">
            Join our waitlist now and unlock exclusive benefits when we launch
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Priority Access',
                description: 'Be among the first to use our platform when we launch'
              },
              {
                title: 'Free Premium',
                description: '30 days of premium features completely free'
              },
              {
                title: 'Early Adopter Discount',
                description: '50% off your first year subscription'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4">
                  {index + 1}
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">
                  {benefit.title}
                </h4>
                <p className="text-foreground/80 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;