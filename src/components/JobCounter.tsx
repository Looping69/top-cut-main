"use client";

import { useEffect } from 'react';

export function initializeJobCounter() {
  // Only run on the client side
  if (typeof window !== 'undefined') {
    // Initialize the job counter if it doesn't exist
    if (!localStorage.getItem('jobCounter')) {
      localStorage.setItem('jobCounter', '895');
    }
  }
}

export function getJobCount(): number {
  // Only run on the client side
  if (typeof window !== 'undefined') {
    const count = localStorage.getItem('jobCounter');
    return count ? parseInt(count) : 895;
  }
  return 895;
}

export default function JobCounter() {
  useEffect(() => {
    initializeJobCounter();
  }, []);
  
  return null;
} 