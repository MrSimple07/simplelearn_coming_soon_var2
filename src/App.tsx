import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import SocialProofSection from './components/SocialProofSection';
import Footer from './components/Footer';
import ThankYouPage from './components/ThankYouPage';
import SuccessMessage from './components/SuccessMessage';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const email = searchParams.get('email');

  const getMessage = () => {
    switch (type) {
      case 'email':
        return `Thank you for joining our waitlist! We'll keep you updated on our progress.`;
      case 'telegram':
        return `Welcome to our Telegram community! You're now part of our early access group.`;
      case 'survey':
        return `Thank you for completing the survey! Your feedback helps us build a better platform.`;
      default:
        return `Thank you for your interest! We'll keep you updated on our progress.`;
    }
  };

  const getSubMessage = () => {
    if (email) {
      return `We've sent a confirmation email to ${email}.`;
    }
    return `We'll notify you when we launch.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-background flex items-center justify-center p-4">
      <SuccessMessage 
        message={getMessage()}
        subMessage={getSubMessage()}
      />
    </div>
  );
};

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturesSection />
              <SocialProofSection />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;