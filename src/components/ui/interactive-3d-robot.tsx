'use client';

import { Suspense, lazy, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  useEffect(() => {
    const hideWatermark = () => {
      // Traverse all elements in the DOM
      const allElements = document.querySelectorAll('*');
      allElements.forEach((el) => {
        // Spline renders elements in shadow boundaries
        if (el.shadowRoot) {
          const shadowLogo = el.shadowRoot.querySelector('#logo') || 
                             el.shadowRoot.querySelector('#spline-logo') ||
                             el.shadowRoot.querySelector('a[href*="spline"]') ||
                             el.shadowRoot.querySelector('[class*="logo"]');
          if (shadowLogo) {
            (shadowLogo as HTMLElement).style.setProperty('display', 'none', 'important');
            (shadowLogo as HTMLElement).style.setProperty('opacity', '0', 'important');
            (shadowLogo as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
            (shadowLogo as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
            (shadowLogo as HTMLElement).style.width = '0px';
            (shadowLogo as HTMLElement).style.height = '0px';
          }
          
          // Inject a persistent stylesheet inside the shadow DOM to keep it hidden
          if (!el.shadowRoot.querySelector('#hide-spline-persistent-style')) {
            const style = document.createElement('style');
            style.id = 'hide-spline-persistent-style';
            style.innerHTML = `
              #logo, #spline-logo, a[href*="spline"], .spline-watermark, [class*="watermark"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                width: 0px !important;
                height: 0px !important;
              }
            `;
            el.shadowRoot.appendChild(style);
          }
        }
      });

      // Target main document as fallback
      const mainLogos = document.querySelectorAll('a[href*="spline.design"], #spline-logo, .spline-watermark');
      mainLogos.forEach((logo) => {
        (logo as HTMLElement).style.setProperty('display', 'none', 'important');
        (logo as HTMLElement).style.setProperty('opacity', '0', 'important');
        (logo as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
      });
    };

    // Run immediately and observe child mutations
    hideWatermark();
    const interval = setInterval(hideWatermark, 300);

    const observer = new MutationObserver(hideWatermark);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-[#E1EEFA]/20 border-2 border-stone-800 rounded-2xl ${className}`}>
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-6 w-6 text-[#2E8BF7]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-[#2E8BF7] font-bold uppercase animate-pulse">
              LOADING ROBOT...
            </span>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className} 
      />
    </Suspense>
  );
}
