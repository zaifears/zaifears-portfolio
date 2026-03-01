'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export function useClarity() {
  useEffect(() => {
    // Initialize Clarity with your project ID
    const projectId = 'vp11pm799j';
    Clarity.init(projectId);
  }, []);
}
