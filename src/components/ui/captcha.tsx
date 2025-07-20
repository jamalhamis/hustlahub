import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

interface CaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  siteKey?: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
}

const Captcha: React.FC<CaptchaProps> = ({
  onVerify,
  onExpire,
  onError,
  siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test site key
  theme = 'light',
  size = 'normal'
}) => {
  const captchaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<number | null>(null);

  useEffect(() => {
    const loadCaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render && captchaRef.current && widgetId === null) {
        try {
          const id = window.grecaptcha.render(captchaRef.current, {
            sitekey: siteKey,
            callback: onVerify,
            'expired-callback': onExpire,
            'error-callback': onError,
            theme: theme,
            size: size
          });
          setWidgetId(id);
          setIsLoaded(true);
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
          if (onError) onError();
        }
      }
    };

    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha && window.grecaptcha.render) {
      loadCaptcha();
    } else {
      // Wait for reCAPTCHA to load
      const checkLoaded = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          clearInterval(checkLoaded);
          loadCaptcha();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkLoaded), 10000);
    }

    return () => {
      if (widgetId !== null && window.grecaptcha && window.grecaptcha.reset) {
        try {
          window.grecaptcha.reset(widgetId);
          setWidgetId(null);
          setIsLoaded(false);
        } catch (error) {
          console.error('Error resetting reCAPTCHA:', error);
        }
      }
    };
  }, [siteKey, theme, size, onVerify, onExpire, onError, widgetId]);

  const reset = () => {
    if (widgetId !== null && window.grecaptcha && window.grecaptcha.reset) {
      try {
        window.grecaptcha.reset(widgetId);
      } catch (error) {
        console.error('Error resetting reCAPTCHA:', error);
      }
    }
  };

  return (
    <div className="captcha-container">
      <div ref={captchaRef} className="g-recaptcha"></div>
      {!isLoaded && (
        <div className="flex items-center justify-center p-4 border border-gray-300 rounded bg-gray-50">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading security verification...</span>
        </div>
      )}
    </div>
  );
};

export default Captcha;