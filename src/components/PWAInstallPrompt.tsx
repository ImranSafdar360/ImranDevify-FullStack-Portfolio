'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay if user hasn't dismissed it before
      const hasPromptBeenDismissed = localStorage.getItem('pwa-install-dismissed');
      if (!hasPromptBeenDismissed) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 30000); // Show after 30 seconds
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem('pwa-install-dismissed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
        localStorage.setItem('pwa-install-dismissed', 'true');
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed
  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
        >
          <div className="bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                {isIOS ? (
                  <Smartphone className="w-5 h-5 text-primary" />
                ) : (
                  <Download className="w-5 h-5 text-primary" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                  Install Portfolio App
                </h3>
                
                {isIOS ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Install this app for a better experience. Tap the share button in Safari 
                      and select "Add to Home Screen".
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDismiss}
                        className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Get quick access to my portfolio with offline support and faster loading.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleInstallClick}
                        className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Install
                      </button>
                      <button
                        onClick={handleDismiss}
                        className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 hover:bg-muted/50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
