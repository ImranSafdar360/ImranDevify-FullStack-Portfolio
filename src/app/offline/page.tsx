import { Metadata } from 'next';
import Link from 'next/link';
import { WifiOff, Home, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Offline - Imran Safdar Portfolio',
  description: 'You are currently offline. Some features may not be available.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <WifiOff className="w-12 h-12 text-muted-foreground" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">You&apos;re Offline</h1>
          <p className="text-muted-foreground mb-6">
            It looks like you&apos;ve lost your internet connection. Don&apos;t worry, you can still browse 
            some pages that have been cached for offline viewing.
          </p>
        </div>

        <div className="space-y-4">
          <button
            // onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
        </div>

        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h2 className="font-semibold mb-2">Available Offline</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Home page</li>
            <li>• About page</li>
            <li>• Projects page</li>
            <li>• Skills page</li>
            <li>• Contact page</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
