import React, { useEffect } from 'react';
import Button from './Button';

declare global {
  interface Window {
    Stripe?: any;
  }
}

interface StripeCheckoutProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ onSuccess, onError }) => {
  useEffect(() => {
    // Load Stripe Buy Button script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <stripe-buy-button
        buy-button-id="buy_btn_1RI19JK8sfX2HQNANqaVfVV0"
        publishable-key="pk_live_51RFhRrK8sfX2HQNAbawJbrN7Y3K9ECdEdMgj4REnmCArxMSAB9tcFc8mOIbYG2Aj10vVAAg1EvrtklkdWZxKaqdK00UHwAUr0c"
      >
      </stripe-buy-button>
    </div>
  );
};

export default StripeCheckout; 