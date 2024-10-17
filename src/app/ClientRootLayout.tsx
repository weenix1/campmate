'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
