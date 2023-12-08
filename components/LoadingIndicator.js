import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function LoadingIndicator() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      const handleStart = () => setLoading(true);
      const handleComplete = () => setLoading(false);
  
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
  
      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    }, [router]);
  
    return loading && (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-600"></div>
      </div>
    );
  }
  
  export default LoadingIndicator;
  
