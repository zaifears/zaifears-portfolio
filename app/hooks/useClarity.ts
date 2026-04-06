'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export function useClarity() {
  useEffect(() => {
    // Defer Clarity initialization until page is interactive/idle
    const initClarity = () => {
      const projectId = 'vp11pm799j';
      Clarity.init(projectId);
    };

    // Use requestIdleCallback if available, otherwise fall back to timeout
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(initClarity);
      return () => cancelIdleCallback(id);
    } else {
      const timeoutId = setTimeout(initClarity, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, []);
}
