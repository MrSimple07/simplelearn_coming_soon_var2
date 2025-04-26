import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from './Button';

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => void;
}

interface SurveyData {
  quizFeatures: string[];
  summaryLanguages: string[];
  videoToQuiz: boolean;
  studyPlan: boolean;
  aiTutor: boolean;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SurveyData>({
    quizFeatures: [],
    summaryLanguages: [],
    videoToQuiz: false,
    studyPlan: false,
    aiTutor: false,
  });

  const handleQuizFeatureToggle = (feature: string) => {
    setData(prev => ({
      ...prev,
      quizFeatures: prev.quizFeatures.includes(feature)
        ? prev.quizFeatures.filter(f => f !== feature)
        : [...prev.quizFeatures, feature]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setData(prev => ({
      ...prev,
      summaryLanguages: prev.summaryLanguages.includes(language)
        ? prev.summaryLanguages.filter(l => l !== language)
        : [...prev.summaryLanguages, language]
    }));
  };

  const handleFeatureToggle = (feature: keyof Omit<SurveyData, 'quizFeatures' | 'summaryLanguages'>) => {
    setData(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-background/80 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Help us build the perfect platform for you
        </h2>
        <p className="text-foreground/80">
          Tell us what features you'd like to see in our AI-powered learning platform
        </p>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className="text-lg font-semibold mb-4">Quiz Features</h3>
          <div className="space-y-3 mb-6">
            {[
              'Multiple Choice',
              'Fill in the Blanks',
              'True/False',
              'Matching',
              'Short Answer',
              'Essay Questions'
            ].map(feature => (
              <label
                key={feature}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-foreground/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.quizFeatures.includes(feature)}
                  onChange={() => handleQuizFeatureToggle(feature)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className="text-lg font-semibold mb-4">Summary Languages</h3>
          <div className="space-y-3 mb-6">
            {[
              'English',
              'Russian',
              'Uzbek',
              'Kazakh',
              'Turkish',
              'Other'
            ].map(language => (
              <label
                key={language}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-foreground/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.summaryLanguages.includes(language)}
                  onChange={() => handleLanguageToggle(language)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{language}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className="text-lg font-semibold mb-4">Additional Features</h3>
          <div className="space-y-3 mb-6">
            {[
              { key: 'videoToQuiz', label: 'Video to Quiz Conversion' },
              { key: 'studyPlan', label: 'Personalized Study Plan' },
              { key: 'aiTutor', label: 'AI Tutor Features' }
            ].map(feature => (
              <label
                key={feature.key}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-foreground/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data[feature.key as keyof Omit<SurveyData, 'quizFeatures' | 'summaryLanguages'>]}
                  onChange={() => handleFeatureToggle(feature.key as keyof Omit<SurveyData, 'quizFeatures' | 'summaryLanguages'>)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{feature.label}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex justify-between items-center mt-8">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep(prev => prev - 1)}
          >
            Back
          </Button>
        )}
        
        {step < 3 ? (
          <Button
            onClick={() => setStep(prev => prev + 1)}
            className="ml-auto"
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="ml-auto"
          >
            Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default SurveyForm; 