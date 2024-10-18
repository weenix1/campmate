'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import '../../src/configs/i18n';


export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
