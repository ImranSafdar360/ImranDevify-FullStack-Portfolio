'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, Settings } from 'lucide-react';
import { cookieConsent } from '@/lib/analytics';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = cookieConsent.hasConsent();
    const hasDeclined = document.cookie.includes('analytics_consent=false');
    
    if (!hasConsent && !hasDeclined) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
    cookieConsent.setConsent(true);
    setShowBanner(false);
  };

  const handleAcceptSelected = () => {
    cookieConsent.setConsent(preferences.analytics || preferences.marketing || preferences.functional);
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
    cookieConsent.setConsent(false);
    setShowBanner(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="mx-auto max-w-4xl">
            <div className="bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    We value your privacy
                  </h3>
                  
                  {!showSettings ? (
                    <div>
                      <p className="text-muted-foreground mb-4">
                        We use cookies to enhance your browsing experience, serve personalized content, 
                        and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Accept All
                        </button>
                        
                        <button
                          onClick={handleDeclineAll}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          Decline All
                        </button>
                        
                        <button
                          onClick={toggleSettings}
                          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Customize
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Choose which cookies you want to accept. You can change these settings at any time.
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/20">
                          <div>
                            <h4 className="font-medium">Necessary Cookies</h4>
                            <p className="text-sm text-muted-foreground">
                              Essential for the website to function properly
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={true}
                            disabled
                            className="w-4 h-4 accent-primary"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <h4 className="font-medium">Analytics Cookies</h4>
                            <p className="text-sm text-muted-foreground">
                              Help us understand how visitors interact with our website
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                            className="w-4 h-4 accent-primary"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <h4 className="font-medium">Functional Cookies</h4>
                            <p className="text-sm text-muted-foreground">
                              Remember your preferences and settings
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.functional}
                            onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                            className="w-4 h-4 accent-primary"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <h4 className="font-medium">Marketing Cookies</h4>
                            <p className="text-sm text-muted-foreground">
                              Used to deliver relevant advertisements
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                            className="w-4 h-4 accent-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleAcceptSelected}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save Preferences
                        </button>
                        
                        <button
                          onClick={toggleSettings}
                          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setShowBanner(false)}
                  className="flex-shrink-0 p-1 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
