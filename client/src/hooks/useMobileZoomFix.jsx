import { useEffect, useRef } from 'react';

/**
 * Custom hook to prevent mobile zoom issues on input focus/blur
 * This hook handles the common mobile browser behavior where
 * inputs zoom in on focus but don't zoom back out on blur
 */
export const useMobileZoomFix = () => {
  const viewportRef = useRef(null);
  const originalViewport = useRef('');

  useEffect(() => {
    // Only apply on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) return;

    // Store original viewport content
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      originalViewport.current = viewportMeta.getAttribute('content');
    }

    // Function to prevent zoom
    const preventZoom = () => {
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
      }
    };

    // Function to restore original viewport
    const restoreViewport = () => {
      if (viewportMeta && originalViewport.current) {
        viewportMeta.setAttribute('content', originalViewport.current);
      }
    };

    // Handle input focus events
    const handleInputFocus = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        preventZoom();
      }
    };

    // Handle input blur events
    const handleInputBlur = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        // Small delay to ensure the input has finished processing
        setTimeout(() => {
          restoreViewport();
        }, 100);
      }
    };

    // Handle touch events to prevent zoom
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('focusin', handleInputFocus, true);
    document.addEventListener('focusout', handleInputBlur, true);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup function
    return () => {
      document.removeEventListener('focusin', handleInputFocus, true);
      document.removeEventListener('focusout', handleInputBlur, true);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      
      // Restore original viewport on cleanup
      restoreViewport();
    };
  }, []);

  return viewportRef;
};

/**
 * Alternative approach: Force viewport reset on window resize
 * This can help with cases where the viewport doesn't reset properly
 */
export const useViewportReset = () => {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) return;

    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Force a viewport reset by temporarily changing and restoring it
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
          const currentContent = viewportMeta.getAttribute('content');
          viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
          
          // Restore after a brief moment
          setTimeout(() => {
            viewportMeta.setAttribute('content', currentContent);
          }, 10);
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);
};

export default useMobileZoomFix;
