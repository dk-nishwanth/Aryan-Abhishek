'use client';

import { Suspense, lazy, useEffect, useRef } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add global CSS to hide Spline watermark - much more efficient!
    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
      #logo, #spline-logo, a[href*="spline"], .spline-watermark, [class*="logo"], [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        width: 0px !important;
        height: 0px !important;
      }
    `;
    document.head.appendChild(globalStyle);

    // Simple, lightweight observer instead of heavy polling
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.shadowRoot) {
              const shadowStyle = document.createElement('style');
              shadowStyle.innerHTML = globalStyle.innerHTML;
              node.shadowRoot.appendChild(shadowStyle);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (globalStyle.parentNode) {
        globalStyle.parentNode.removeChild(globalStyle);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Suspense
        fallback={
          <div className={`w-full h-full flex items-center justify-center bg-[#E1EEFA]/20 ${className}`}>
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-[#2E8BF7]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z" />
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
          className={`w-full h-full ${className}`}
        />
      </Suspense>
    </div>
  );
}
